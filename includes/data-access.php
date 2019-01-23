<?php

class EnvImpactComparison_DataAccess
{
    public static function setup_database()
    {
        global $wpdb;

        $tng_table_name = self::get_tng_table_name();
        $electric_vehicles_table_name = self::get_electric_vehicles_table_name();
        $ice_vehicles_table_name = self::get_ice_vehicles_table_name();

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "
        CREATE TABLE $tng_table_name (
            id mediumint(9) NOT NULL,
			tng varchar(1000) DEFAULT '' NOT NULL,
			time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;

        CREATE TABLE $electric_vehicles_table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(100) DEFAULT '' NOT NULL,
            consumption decimal(6,2) DEFAULT 0 NOT NULL,
			pictureUrl varchar(500) DEFAULT '' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;

        CREATE TABLE $ice_vehicles_table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            name varchar(100) DEFAULT '' NOT NULL,
            consumption decimal(6,2) DEFAULT 0 NOT NULL,
			pictureUrl varchar(500) DEFAULT '' NOT NULL,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    public static function save_tng($tng)
    {
        global $wpdb;

        $table_name = self::get_tng_table_name();

        $wpdb->replace(
            $table_name,
            array(
                'id' => 1,
                'tng' => json_encode($tng),
                'time' => current_time('mysql'),
            ),
            array(
                '%s',
                '%s',
                '%s',
            )
        );
    }

    public static function get_tng()
    {
        global $wpdb;

        $table_name = self::get_tng_table_name();

        $tngs = $wpdb->get_results(
            "
            SELECT tng, time
            FROM $table_name
            WHERE id = 1
            "
        );
        if (count($tngs) == 0) {
            return null;
        }

        return $tngs[0];
    }

    public static function save_electric_vehicles($electric_vehicles)
    {
        $table_name = self::get_electric_vehicles_table_name();
        self::save_vehicles($electric_vehicles, $table_name);
    }

    public static function get_electric_vehicles()
    {
        $table_name = self::get_electric_vehicles_table_name();
        return self::get_vehicles($table_name);
    }

    public static function save_ice_vehicles($ice_vehicles)
    {
        $table_name = self::get_ice_vehicles_table_name();
        self::save_vehicles($ice_vehicles, $table_name);
    }

    public static function get_ice_vehicles()
    {
        $table_name = self::get_ice_vehicles_table_name();
        return self::get_vehicles($table_name);
    }

    private static function save_vehicles($vehicles, $table_name)
    {
        global $wpdb;

        $wpdb->query("TRUNCATE TABLE $table_name");

        foreach ($vehicles as $v) {
            $wpdb->insert(
                $table_name,
                array(
                    'name' => $v->name,
                    'consumption' => $v->consumption,
                    'pictureUrl' => $v->pictureUrl 
                ),
                array(
                    '%s',
                    '%s',
                    '%s',
                )
            );
        }
    }

    private static function get_vehicles($table_name)
    {
        global $wpdb;

        $vehicles = $wpdb->get_results(
            "
            SELECT name, consumption, pictureUrl
            FROM $table_name
            "
        );

        return $vehicles;
    }

    private static function get_tng_table_name()
    {
        global $wpdb;

        return $wpdb->prefix . 'env_impact_comparison_tng';
    }

    private static function get_electric_vehicles_table_name()
    {
        global $wpdb;

        return $wpdb->prefix . 'env_impact_comparison_ev';
    }

    private static function get_ice_vehicles_table_name()
    {
        global $wpdb;

        return $wpdb->prefix . 'env_impact_comparison_ice';
    }
}
