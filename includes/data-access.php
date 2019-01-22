<?php

class EnvImpactComparisonDataAccess
{
    public static function createDatabase()
    {
        global $wpdb;

        $table_name = self::getTNGTableName();

        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL,
			tng varchar(1000) DEFAULT '' NOT NULL,
			time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            PRIMARY KEY  (id)
		) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    public static function saveTNG($tng)
    {
        global $wpdb;

        $table_name = self::getTNGTableName();

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

    public static function getTNG()
    {
        global $wpdb;

        $table_name = self::getTNGTableName();

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

    private static function getTNGTableName()
    {
        global $wpdb;

        return $wpdb->prefix . 'env_impact_comparison_tng';
    }
}
