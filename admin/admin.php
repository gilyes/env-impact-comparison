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
        add_settings_section("env_impact_comparison_settings", "Settings", null, "env_impact_comparison");
        add_settings_field("electric-vehicles-csv", "Upload EV CSV", array($this, "electric_vehicles_upload"), "env_impact_comparison", "env_impact_comparison_settings");
        add_settings_field("ics-vehicles-csv", "Upload ICS CSV", array($this, "ice_vehicles_upload"), "env_impact_comparison", "env_impact_comparison_settings");
        register_setting("env_impact_comparison_settings", "electric-vehicles-csv", array($this, "handle_electric_vehicles_upload"));
        register_setting("env_impact_comparison_settings", "ice-vehicles-csv", array($this, "handle_ice_vehicles_upload"));
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
                // TODO: save to db
            }
        }

        return $option;
    }

    public function handle_electric_ice_upload($option)
    {
        if (!empty($_FILES["electric-ice-csv"]["tmp_name"])) {
            $content = $this->read_uploaded_file($_FILES["ice-vehicles-csv"]);
            if (isset($content)) {
                // TODO: save to db
            }
        }

        return $option;
    }

    public function admin_display()
    {
        echo '
      	<div class="wrap">
        <h1>Environmental Impact Comparison - Configuration</h1>
		<form method="post" action="options.php" enctype="multipart/form-data">';

        settings_fields("env_impact_comparison_settings");
        do_settings_sections("env_impact_comparison");
        submit_button();

        echo '</form></div>';
    }

    public function electric_vehicles_upload()
    {
        echo '<input type="file" name="electric-vehicles-csv" />';
        echo get_option('electric-vehicles-csv');
    }

    public function ice_vehicles_upload()
    {
        echo '<input type="file" name="ice-vehicles-csv" />';
        echo get_option('ice-vehicles-csv');
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
