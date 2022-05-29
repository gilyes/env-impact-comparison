<?php

require_once 'data-access.php';
require_once 'tng.php';

class EnvImpactComparison_Api
{
    public static function get_electric_vehicles($request)
    {
        return EnvImpactComparison_DataAccess::get_electric_vehicles();
    }

    public static function get_ice_vehicles($request)
    {
        return EnvImpactComparison_DataAccess::get_ice_vehicles();
    }

    public static function get_tng($request)
    {
        $provinceId = $request['id'];
        if (!isset($provinceId)) {
            $provinceId = "AB";
        }

        $cachedTNG = EnvImpactComparison_DataAccess::get_tng($provinceId);
        $tng = new stdClass;
        if (isset($cachedTNG) && isset($cachedTNG->time)) {
            $tng = json_decode($cachedTNG->tng);
            $cacheTime = new DateTime($cachedTNG->time);
            if (EnvImpactComparison_TngLoader::is_tng_time_current($provinceId, $cacheTime)) {
                return json_decode($cachedTNG->tng);
            }
        }

        $newTng = EnvImpactComparison_TngLoader::get_tng($provinceId);

        if (!isset($newTng)) {
            return $tng;
        }

        $newTng->time = (new DateTime('now', new DateTimeZone('America/Edmonton')))->format("Y-m-d h:i A");
        $newTng->provinceId = $provinceId;
        EnvImpactComparison_DataAccess::save_tng($newTng, $provinceId);

        return $newTng;
    }

    public static function get_config()
    {
        $options = get_option('env_impact_comparison_settings', array());
        $defaultElectricVehicle = EnvImpactComparison_DataAccess::get_electric_vehicle($options['default_electric_vehicle'] ?? '');
        $defaultIceVehicle = EnvImpactComparison_DataAccess::get_ice_vehicle($options['default_ice_vehicle'] ?? '');
        return (object) [
            'defaultElectricVehicle' => $defaultElectricVehicle,
            'defaultIceVehicle' => $defaultIceVehicle,
            'explanationText' => $options['explanation_text'] ?? '',
            'costComparisonDefaults' => (object) [
                'annualDistanceDriven' => $options['default_annual_distance_driven'] ?? '',
                'fuelCost' => $options['default_fuel_cost'] ?? '',
                'electricityRate' => $options['default_electricity_rate'] ?? ''],
            'provinces' => [
                (object) ['name' => 'Alberta', 'id' => 'AB'],
                (object) ['name' => 'British Columbia', 'id' => 'BC'],
                (object) ['name' => 'Manitoba', 'id' => 'MB'],
                (object) ['name' => 'New Brunswick', 'id' => 'NB'],
                (object) ['name' => 'Newfoundland and Labrador', 'id' => 'NL'],
                (object) ['name' => 'Nortwest Territories', 'id' => 'NT'],
                (object) ['name' => 'Nova Scotia', 'id' => 'NS'],
                (object) ['name' => 'Ontario', 'id' => 'ON'],
                (object) ['name' => 'Prince Edward Island', 'id' => 'PE'],
                (object) ['name' => 'Quebec', 'id' => 'QC'],
                (object) ['name' => 'Saskatchewan', 'id' => 'SK'],
                (object) ['name' => 'Yukon', 'id' => 'YT'],
            ],
            'defaultProvince' => (object) ['name' => 'Alberta', 'id' => 'AB'],
        ];
    }
}
