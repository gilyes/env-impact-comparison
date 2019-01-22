<?php

class EnvImpactComparisonApi
{
    public static function getElectricVehicles($request)
    {
        return self::readVehicles(plugin_dir_path(__FILE__) . "data/ev.csv");
    }

    public static function getIceVehicles($request)
    {
        return self::readVehicles(plugin_dir_path(__FILE__) . "data/ice.csv");
    }

    public static function getTNG($request)
    {
        $htmlContent = file_get_contents("http://ets.aeso.ca/ets_web/ip/Market/Reports/CSDReportServlet");
        $dom = new DOMDocument();
        @$dom->loadHTML($htmlContent);

        $xpath = new DOMXPath($dom);

        $tng = [];
        foreach ($xpath->query("//table[tr/th[1] = 'GENERATION']")->item(0)->getElementsByTagName('tr') as $rows) {
            $cells = $rows->getElementsByTagName('td');

            $typeNode = $cells->item(0);
            $tngNode = $cells->item(2);

            if (isset($typeNode)) {
                $type = trim(strtolower($typeNode->textContent));
                if ($type !== 'group') {
                    $tng[$type] = $tngNode->textContent;
                }
            }
        }

        return $tng;
    }

    public static function readVehicles($fileName)
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
