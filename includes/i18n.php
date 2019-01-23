<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link
 * @since      1.0.0
 *
 * @package    EnvImpactComparison
 * @subpackage EnvImpactComparison/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 */
class EnvImpactComparison_i18n
{

    public function load_plugin_textdomain()
    {

        load_plugin_textdomain(
            'env-impact-comparison',
            false,
            dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
        );

    }

}
