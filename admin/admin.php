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

    }

}
