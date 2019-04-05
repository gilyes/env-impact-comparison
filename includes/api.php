<?php

require_once 'data-access.php';

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
        $cachedTNG = EnvImpactComparison_DataAccess::get_tng();
        $tng = new stdClass;
        if (isset($cachedTNG) && isset($cachedTNG->time)) {
            $tng = json_decode($cachedTNG->tng);

            $minTime = new DateTime();
            $minTime->modify("-2 minutes");
            $cacheTime = new DateTime($cachedTNG->time);
            if ($cacheTime > $minTime) {
                return json_decode($cachedTNG->tng);
            }
        }

        @$htmlContent = file_get_contents("http://ets.aeso.ca/ets_web/ip/Market/Reports/CSDReportServlet");
        if ($htmlContent === false) {
            return $tng;
        }

        $dom = new DOMDocument();
        @$dom->loadHTML($htmlContent);

        $xpath = new DOMXPath($dom);

        foreach ($xpath->query("//table[tr/th[1] = 'GENERATION']")->item(0)->getElementsByTagName('tr') as $rows) {
            $cells = $rows->getElementsByTagName('td');

            $typeNode = $cells->item(0);
            $tngNode = $cells->item(2);

            if (isset($typeNode)) {
                $type = trim(strtolower($typeNode->textContent));
                if ($type !== 'group') {
                    $tng->{$type} = $tngNode->textContent;
                }
            }
        }

        $tng->time = (new DateTime('now', new DateTimeZone('America/Edmonton')))->format("Y-m-d h:i A");
        EnvImpactComparison_DataAccess::save_tng($tng);

        return $tng;
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
        ];
    }

    public static function read_vehicles($fileName)
    {
        $csv = array_map('str_getcsv', file($fileName));

        $vehicles = [];
        foreach ($csv as $vehicle) {
            array_push($vehicles, (object) [
                'name' => $vehicle[0],
                'consumption' => $vehicle[1],
                'pictureUrl' => $vehicle[2],
            ]);
        }

        return $vehicles;
    }
}
