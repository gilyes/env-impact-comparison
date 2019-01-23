<?php

class EnvImpactComparison_Activator
{

    public static function activate()
    {
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/data-access.php';
        EnvImpactComparison_DataAccess::createDatabase();
    }

}
