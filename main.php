<?php

/**
 * @wordpress-plugin
 * Plugin Name:       env-impact-comparison
 * Plugin URI:        https://github.com/gilyes/env-impact-comparison
 * Description:       Vehicle environmental impact comparison view.
 * Version:           1.0.0
 * Author:            George Ilyes
 * Author URI:        https://gilyes.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       env-impact-comparison
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

define('PLUGIN_NAME_VERSION', '1.0.0');

function activate_env_impact_comparison()
{
    require_once plugin_dir_path(__FILE__) . 'includes/activator.php';
    EnvImpactComparison_Activator::activate();
}

function deactivate_env_impact_comparison()
{
    require_once plugin_dir_path(__FILE__) . 'includes/deactivator.php';
    EnvImpactComparison_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_env_impact_comparison');
register_deactivation_hook(__FILE__, 'deactivate_env_impact_comparison');

require plugin_dir_path(__FILE__) . 'includes/env-impact-comparison.php';

function run_env_impact_comparison()
{
    $plugin = new EnvImpactComparison();
    $plugin->run();
}

run_env_impact_comparison();
