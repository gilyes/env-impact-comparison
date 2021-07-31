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

            case "BC":
                return self::get_tng_BC();

            case "SK":
                return self::get_tng_SK();

            case "MB":
                return self::get_tng_MB();

            case "QC":
                return self::get_tng_QC();

            case "YT":
                return self::get_tng_YT();

            case "NT":
                return self::get_tng_NT();

            case "NB":
                return self::get_tng_NB();

            case "NL":
                return self::get_tng_NL();

            case "NS":
                return self::get_tng_NS();

            case "PE":
                return self::get_tng_PE();

            case "SK":
                return self::get_tng_SK();

            case "SK":
                return self::get_tng_SK();
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
                $type = str_replace(" ", "", trim(strtolower($typeNode->textContent)));
                if ($type !== 'group') {
                    $tng->{$type} = $tngNode->textContent;
                }
            }
        }

        $total =
            ($tng->coal ?? 0) +
            ($tng->gas ?? 0) +
            ($tng->hydro ?? 0) +
            ($tng->wind ?? 0) +
            ($tng->solar ?? 0) +
            ($tng->dualfuel ?? 0) +
            ($tng->energystorage ?? 0) +
            ($tng->other ?? 0);

        if ($total == 0) {
            return (object) [];
        }

        return (object) [
            'coal' => ($tng->coal ?? 0) * 100 / $total,
            'gas' => ($tng->gas ?? 0) * 100 / $total,
            'hydro' => ($tng->hydro ?? 0) * 100 / $total,
            'wind' => ($tng->wind ?? 0) * 100 / $total,
            'solar' => ($tng->solar ?? 0) * 100 / $total,
            'dualFuel' => ($tng->dualfuel ?? 0) * 100 / $total,
            'energyStorage' => ($tng->energystorage ?? 0) * 100 / $total,
            'other' => ($tng->other ?? 0) * 100 / $total,
            'type' => 'live',
            'sourceUrl' => 'http://ets.aeso.ca/ets_web/ip/Market/Reports/CSDReportServlet',
        ];
    }

    private static function get_tng_ON()
    {
        // TODO: get this from live data
        $tng = json_decode('{ "nuclear": 63, "hydro": 30, "gas": 0.9, "wind": 2.8, "solar": 2.1, "biomass": 1, "type": "historical", "sourceUrl": "http://www.ieso.ca/power-data" }');
        return $tng;
    }

    private static function get_tng_BC()
    {
        $tng = json_decode('{ "hydro": 90, "biomass": 6, "gas": 2, "wind": 1, "other": 1, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/bc-eng.html?=undefined&wbdisable=false" }');
        return $tng;
    }

    private static function get_tng_SK()
    {
        $tng = json_decode('{ "coal": 31, "gas": 41, "hydro": 20, "wind": 5, "other": 3, "type": "historical", "sourceUrl": "https://www.saskpower.com/our-power-future/our-electricity/electrical-system/balancing-supply-options" }');
        return $tng;
    }

    private static function get_tng_MB()
    {
        $tng = json_decode('{ "hydro": 97, "gas": 3, "type": "historical", "sourceUrl": "https://www.hydro.mb.ca/corporate/teachers/pdf/manitoba_energy_supply.pdf" }');
        return $tng;
    }

    private static function get_tng_QC()
    {
        $tng = json_decode('{ "hydro": 95, "wind": 4, "biomass": 1, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/qc-eng.html" }');
        return $tng;
    }

    private static function get_tng_YT()
    {
        $tng = json_decode('{ "hydro": 92, "diesel": 6, "gas": 2, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/yt-eng.html" }');
        return $tng;
    }

    private static function get_tng_NT()
    {
        $tng = json_decode('{ "diesel": 57, "hydro": 39, "wind": 2, "gas": 2, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/nt-eng.html" }');
        return $tng;
    }

    private static function get_tng_NB()
    {
        $tng = json_decode('{ "hydro": 20, "coal": 21, "nuclear": 36, "gas": 10, "diesel": 2, "wind": 7, "biomass": 4, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/nb-eng.html" }');
        return $tng;
    }

    private static function get_tng_NL()
    {
        $tng = json_decode('{ "hydro": 94, "biomass": 1, "diesel": 5, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/nl-eng.html" }');
        return $tng;
    }

    private static function get_tng_NS()
    {
        // TODO: get this from live data
        $tng = json_decode('{ "hydro": 11, "coal": 50, "wind": 17, "gas": 14, "biomass": 1, "imports": 8, "type": "historical", "sourceUrl": "https://www.nspower.ca/en/home/about-us/todayspower.aspx" }');
        return $tng;
    }

    private static function get_tng_PE()
    {
        $tng = json_decode('{ "wind": 98, "diesel": 1, "biomass": 1, "type": "historical", "sourceUrl": "https://www.neb-one.gc.ca/nrg/ntgrtd/mrkt/nrgsstmprfls/pe-eng.html" }');
        return $tng;
    }
}
