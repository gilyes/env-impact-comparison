<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link
 * @since      1.0.0
 *
 * @package    EnvImpactComparison
 * @subpackage EnvImpactComparison/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    EnvImpactComparison
 * @subpackage EnvImpactComparison/public
 * @author     George Ilyes  <a@a.com>
 */
class EnvImpactComparison_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of the plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_shortcode('env-impact-comparison', array($this, 'shortcode'));
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in EnvImpactComparison_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The EnvImpactComparison_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/env-impact-comparison-public.css', array(), $this->version, 'all');
        wp_enqueue_style($this->plugin_name . "_font_roboto", "https://fonts.googleapis.com/css?family=Roboto");

    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in EnvImpactComparison_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The EnvImpactComparison_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/env-impact-comparison-public.js', array('jquery'), $this->version, false);
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

    public function shortcode($atts)
    {
        $shortcode = '<div class="env-impact-comparison-shortcode" id="env-impact-comparison-react-root"></div>';
        return $shortcode;
    }
}
