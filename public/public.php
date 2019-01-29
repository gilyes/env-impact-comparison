<?php

class EnvImpactComparison_Public
{
    private $plugin_name;

    private $version;

    public function __construct($plugin_name, $version)
    {
        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_shortcode('env-impact-comparison', array($this, 'shortcode'));
    }

    public function enqueue_styles()
    {
        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/public.css', array(), $this->version, 'all');
        wp_enqueue_style($this->plugin_name . "_font_roboto", "https://fonts.googleapis.com/css?family=Roboto");
    }

    public function enqueue_scripts()
    {
        wp_enqueue_script($this->plugin_name . "_public", plugin_dir_url(__FILE__) . 'js/public.js', array('jquery'), $this->version, false);
        $jsfiles = scandir(dirname(__FILE__) . '/../app/dist/');
        $react_js_to_load = '';
        foreach ($jsfiles as $filename) {
            if (strpos($filename, '.js') && !strpos($filename, '.js.map')) {
                $react_js_to_load = plugin_dir_url(__FILE__) . '../app/dist/' . $filename;
            }
        }
        wp_enqueue_script($this->plugin_name . "_google_chart", "https://www.gstatic.com/charts/loader.js");
        wp_enqueue_script($this->plugin_name . "_react", $react_js_to_load, '', $this->version, true);
    }

    public function register_api()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/api.php';
        register_rest_route('env-impact-comparison/v1', '/electricvehicles', array(
            'methods' => 'GET',
            'callback' => array('EnvImpactComparison_Api', 'get_electric_vehicles'),
        ));

        register_rest_route('env-impact-comparison/v1', '/icevehicles', array(
            'methods' => 'GET',
            'callback' => array('EnvImpactComparison_Api', 'get_ice_vehicles'),
        ));

        register_rest_route('env-impact-comparison/v1', '/tng', array(
            'methods' => 'GET',
            'callback' => array('EnvImpactComparison_Api', 'get_tng'),
        ));

        register_rest_route('env-impact-comparison/v1', '/costCompDefaults', array(
            'methods' => 'GET',
            'callback' => array('EnvImpactComparison_Api', 'get_cost_comparison_defaults'),
        ));
    }

    public function shortcode($atts)
    {
        $shortcode = '<div class="env-impact-comparison-shortcode" id="env-impact-comparison-react-root"></div>';
        return $shortcode;
    }
}
