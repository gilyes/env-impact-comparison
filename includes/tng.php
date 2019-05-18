<?php

require_once 'data-access.php';

class EnvImpactComparison_TngLoader
{
    public static function get_tng($provinceId)
    {
        switch ($provinceId) {
            case "AB":
                return self::get_tng_AB();

            case "ON":
                return self::get_tng_ON();
        }
        return null;
    }

    public static function is_tng_time_current($provinceId, $time)
    {
        $minTime = new DateTime();

        switch ($provinceId) {
            case "AB":
                $minTime->modify("-2 minutes");
                break;

            case "ON":
                $minTime->modify("0 hours");
                break;

            default:
                // by default, treat TNG values as static
                $minTime = (new DateTime())->setTimestamp(0);
                break;
        }

        return $time > $minTime;
    }

    private static function get_tng_AB()
    {
        @$htmlContent = file_get_contents("http://ets.aeso.ca/ets_web/ip/Market/Reports/CSDReportServlet");
        if ($htmlContent === false) {
            return null;
        }

        $tng = new stdClass;

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

        $total = ($tng->coal ?? 0) + ($tng->gas ?? 0) + ($tng->hydro ?? 0) + ($tng->wind ?? 0) + ($tng->other ?? 0);
        if ($total == 0) {
            return (object) [];
        }

        return (object) [
            'coal' => ($tng->coal ?? 0) * 100 / $total,
            'gas' => ($tng->gas ?? 0) * 100 / $total,
            'hydro' => ($tng->hydro ?? 0) * 100 / $total,
            'wind' => ($tng->wind ?? 0) * 100 / $total,
            'other' => ($tng->other ?? 0) * 100 / $total,
        ];
    }

    private static function get_tng_ON()
    {
        $tng = json_decode('{ "nuclear": 63, "hydro": 30, "gas": 0.9, "wind": 2.8, "solar": 2.1, "biomass": 1 }');
        return $tng;
    }
}
