<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 */
class EnvImpactComparison_Admin
{
    private $plugin_name;

    private $version;

    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    public function enqueue_styles()
    {
        wp_enqueue_style($this->plugin_name . "_admin", plugin_dir_url(__FILE__) . 'css/admin.css', array(), $this->version, 'all');
    }

    public function enqueue_scripts()
    {
        wp_enqueue_script($this->plugin_name . "_admin", plugin_dir_url(__FILE__) . 'js/admin.js', array('jquery'), $this->version, false);
    }

    public function register_admin_page()
    {
        register_setting("env_impact_comparison_settings", "electric_vehicles_csv", array($this, "handle_electric_vehicles_upload"));
        register_setting("env_impact_comparison_settings", "ice_vehicles_csv", array($this, "handle_ice_vehicles_upload"));
        register_setting("env_impact_comparison_settings", "env_impact_comparison_settings", array($this, "validate_settings"));

        add_settings_section("env_impact_comparison_settings", "Settings", null, "env_impact_comparison");

        add_settings_field("electric-vehicles-csv", "Upload Electric Vehicles (CSV)", array($this, "electric_vehicles_upload"),
            "env_impact_comparison", "env_impact_comparison_settings");
        add_settings_field("ice-vehicles-csv", "Upload ICE Vehicles (CSV)", array($this, "ice_vehicles_upload"),
            "env_impact_comparison", "env_impact_comparison_settings");

        add_settings_field("default-electric-vehicle", "Default Electric Vehicle Name", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_electric_vehicle'));
        add_settings_field("default-ice-vehicle", "Default ICE Vehicle Name", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_ice_vehicle'));

        add_settings_field("default-annual-distance-driven", "Default Annual Distance Driven (km)", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_annual_distance_driven'));
        add_settings_field("default-fuel-cost", "Default Fuel Cost ($/L)", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_fuel_cost'));
        add_settings_field("default-electricity-rate", "Default Electricity Rate (c/kWh)", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_electricity_rate'));
        add_settings_field("default-electricity-rate", "Default Electricity Rate (c/kWh)", array($this, "textbox_callback"),
            "env_impact_comparison", "env_impact_comparison_settings", array('default_electricity_rate'));
    }

    public function admin_menu_item()
    {
        add_submenu_page("options-general.php", "Environmental Impact Comparison", "Environmental Impact Comparison",
            "manage_options", $this->plugin_name, array($this, 'admin_display'));
    }

    public function handle_electric_vehicles_upload($option)
    {
        if (!empty($_FILES["electric-vehicles-csv"]["tmp_name"])) {
            $content = $this->read_uploaded_file($_FILES["electric-vehicles-csv"]);
            if (isset($content)) {
                require_once plugin_dir_path(dirname(__FILE__)) . 'includes/data-access.php';
                $vehicles = self::csv_to_vehicle_array($content);
                if (isset($vehicles)) {
                    EnvImpactComparison_DataAccess::save_electric_vehicles($vehicles);
                }
            }
        }

        return $option;
    }

    public function handle_ice_vehicles_upload($option)
    {
        if (!empty($_FILES["ice-vehicles-csv"]["tmp_name"])) {
            $content = $this->read_uploaded_file($_FILES["ice-vehicles-csv"]);
            if (isset($content)) {
                require_once plugin_dir_path(dirname(__FILE__)) . 'includes/data-access.php';
                $vehicles = self::csv_to_vehicle_array($content);
                if (isset($vehicles)) {
                    EnvImpactComparison_DataAccess::save_ice_vehicles($vehicles);
                }
            }
        }

        return $option;
    }

    private static function csv_to_vehicle_array($text)
    {
        $text = trim($text);
        $csv = array_map('str_getcsv', preg_split("/\r\n|\n|\r/", $text));
        $vehicles = [];
        try {
            foreach ($csv as $vehicle) {
                if (count($vehicle) < 3) {
                    add_settings_error('env_impact_comparison_settings', esc_attr('settings_updated'), "Invalid CSV, must have 3 columns (name, consumption, pictureUrl).", 'error');
                    return null;
                }

                array_push($vehicles, (object) [
                    'name' => $vehicle[0],
                    'consumption' => $vehicle[1],
                    'pictureUrl' => $vehicle[2],
                ]);
            }
        } catch (Exception $e) {
            add_settings_error('env_impact_comparison_settings', esc_attr('settings_updated'), "Something went wrong: $e", 'error');

            return null;
        }

        return $vehicles;
    }

    public function admin_display()
    {
        echo '
      	<div class="wrap">
        <h1>Environmental Impact Comparison</h1>
		<form method="post" action="options.php" enctype="multipart/form-data">';

        settings_fields("env_impact_comparison_settings");
        do_settings_sections("env_impact_comparison");

        echo '<h3>Instructions</h3>';
        echo '<p>Select one or both files then <b>press Save Changes</b> to update the list of vehicles.</p>';
        echo '<p>The format of these CSV files is: <code>vehicle_name, consumption (number), picture_url</code>. Do not include column headers in the files.</p>';
        submit_button();

        echo '</form></div>';
    }

    public function electric_vehicles_upload()
    {
        echo '<input type="file" name="electric-vehicles-csv" accept=".csv" />';
    }

    public function ice_vehicles_upload()
    {
        echo '<input type="file" name="ice-vehicles-csv" accept=".csv" />';
    }

    public function textbox_callback($args)
    {
        $option = get_option('env_impact_comparison_settings');
        $id = $args[0];
        $value = isset($option[$id]) ? $option[$id] : "";
        echo "<input type='text' id='$id' name='env_impact_comparison_settings[$id]' value='$value' />";
    }

    public function validate_settings($option)
    {
        if (!empty($option['default_annual_distance_driven']) && !is_numeric($option['default_annual_distance_driven'])) {
            add_settings_error('env_impact_comparison_settings', esc_attr('settings_updated'), "Invalid Default Annual Distance Driven.", 'error');
        }

        if (!empty($option['default_fuel_cost']) && !is_numeric($option['default_fuel_cost'])) {
            add_settings_error('env_impact_comparison_settings', esc_attr('settings_updated'), "Invalid Default Fuel Cost.", 'error');
        }

        if (!empty($option['default_electricity_rate']) && !is_numeric($option['default_electricity_rate'])) {
            add_settings_error('env_impact_comparison_settings', esc_attr('settings_updated'), "Invalid Default Electricity Rate.", 'error');
        }

        return $option;
    }

    public function add_settings_link($links)
    {
        $settings_link = "<a href='" . admin_url("options-general.php?page=$this->plugin_name") . "'>" . __('Settings') . '</a>';
        array_push($links, $settings_link);
        return $links;
    }

    private function read_uploaded_file($uploadInfo)
    {
        $fileName = $uploadInfo["tmp_name"];
        if (!is_uploaded_file($fileName)) {
            return null;
        }

        try {
            // Undefined | Multiple Files | $_FILES Corruption Attack
            // If this request falls under any of them, treat it invalid.
            if (!isset($uploadInfo['error']) ||
                is_array($uploadInfo['error'])) {
                throw new RuntimeException('Invalid parameters.');
            }

            switch ($uploadInfo['error']) {
                case UPLOAD_ERR_OK:
                    break;
                case UPLOAD_ERR_NO_FILE:
                    throw new RuntimeException('No file sent.');
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new RuntimeException('Exceeded filesize limit.');
                default:
                    throw new RuntimeException('Unknown errors.');
            }

        } catch (RuntimeException $e) {
            error_log($e);
            return null;
        }

        $contents = file_get_contents($fileName);

        return $contents;
    }
}
