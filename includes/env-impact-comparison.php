<?php

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 */
class EnvImpactComparison
{
    protected $loader;

    protected $plugin_name;

    protected $version;

    public function __construct()
    {
        if (defined('PLUGIN_NAME_VERSION')) {
            $this->version = PLUGIN_NAME_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'env-impact-comparison';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    private function load_dependencies()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/loader.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/i18n.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/admin.php';
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/public.php';

        $this->loader = new EnvImpactComparison_Loader();
    }

    private function set_locale()
    {
        $plugin_i18n = new EnvImpactComparison_i18n();

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
    }

    private function define_admin_hooks()
    {
        $plugin_admin = new EnvImpactComparison_Admin($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');
        $this->loader->add_action('admin_init', $plugin_admin, 'register_admin_page');
		$this->loader->add_action('admin_menu', $plugin_admin, 'admin_menu_item');

        $this->loader->add_filter("plugin_action_links_$this->plugin_name/main.php", $plugin_admin, 'add_settings_link');
    }

    private function define_public_hooks()
    {
        $plugin_public = new EnvImpactComparison_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
        $this->loader->add_action('rest_api_init', $plugin_public, 'register_api');
    }

    public function run()
    {
        $this->loader->run();
    }

    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    public function get_loader()
    {
        return $this->loader;
    }

    public function get_version()
    {
        return $this->version;
    }
}
