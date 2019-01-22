<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link
 * @since             1.0.0
 * @package           EnvImpactComparison
 *
 * @wordpress-plugin
 * Plugin Name:       env-impact-comparison
 * Plugin URI:
 * Description:       Vehicle environmental impact comparison view.
 * Version:           1.0.0
 * Author:            George Ilyes
 * Author URI:
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       env-impact-comparison
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('PLUGIN_NAME_VERSION', '1.0.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-env-impact-comparison-activator.php
 */
function activate_env_impact_comparison()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-env-impact-comparison-activator.php';
    EnvImpactComparison_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-env-impact-comparison-deactivator.php
 */
function deactivate_env_impact_comparison()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-env-impact-comparison-deactivator.php';
    EnvImpactComparison_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_env_impact_comparison');
register_deactivation_hook(__FILE__, 'deactivate_env_impact_comparison');

require_once plugin_dir_path(__FILE__) . 'includes/api.php';
add_action('rest_api_init', function () {
    register_rest_route('env-impact-comparison/v1', '/electricvehicles', array(
        'methods' => 'GET',
        'callback' => array('EnvImpactComparisonApi', 'getElectricVehicles'),
    ));}
);
add_action('rest_api_init', function () {
    register_rest_route('env-impact-comparison/v1', '/icevehicles', array(
        'methods' => 'GET',
        'callback' => array('EnvImpactComparisonApi', 'getIceVehicles'),
    ));}
);
add_action('rest_api_init', function () {
    register_rest_route('env-impact-comparison/v1', '/tng', array(
        'methods' => 'GET',
        'callback' => array('EnvImpactComparisonApi', 'getTNG'),
    ));}
);

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-env-impact-comparison.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_env_impact_comparison()
{

    $plugin = new EnvImpactComparison();
    $plugin->run();

}
run_env_impact_comparison();
