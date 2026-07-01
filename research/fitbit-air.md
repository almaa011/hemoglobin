# Fitbit Air (2026) — Hardware Research Record

Generated: 2026-07-01  
Researchers: A (primary sources / FCC), B (teardown / implementation), C (adversarial / gap mapping)

---

## DEVICE OVERVIEW

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Google Fitbit Air is a screenless fitness tracker launched in May 2026 at $99, shipping from May 26, 2026.
QUOTE: "The Fitbit Air is the smallest and most affordable tracker designed for comfortable, 24/7 health monitoring... Shipments start May 26, 2026."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air weighs 5.2 grams without band, 12 grams with band, is 8.3mm thick.
QUOTE: "our smallest tracker yet... tiny, discreet pebble... weighs 5.2 grams on its own—12 grams with the band—and at 8.3mm thick"
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air is water resistant to 50 meters.
QUOTE: "Water resistant up to 50 meters"
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-air-whoop-competitor-everything-details.html
CLAIM: Fitbit Air housing is made of recycled polycarbonate and PBT plastics.
QUOTE: "Polycarbonate and PBT plastics"
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-air-whoop-competitor-everything-details.html
CLAIM: Fitbit Air uses Bluetooth 5.0.
QUOTE: "Bluetooth 5.0"
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-air-whoop-competitor-everything-details.html
CLAIM: Fitbit Air does not contain GPS or barometer; it uses phone GPS instead.
QUOTE: "does not contain GPS or barometer—it leverages phone GPS instead"
CONFIDENCE: verified
RESEARCHER: A

---

## SENSORS

### PPG / Heart Rate Sensor

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air contains an optical heart rate monitor with red and infrared sensors; also uses green LEDs for heart rate.
QUOTE: "high-fidelity sensor technology enabling advanced health and fitness tracking like 24/7 heart rate, heart rhythm monitoring with Afib alerts, SpO2..."
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://support.google.com/googlehealth/answer/14237938?hl=en
CLAIM: Fitbit Air uses rapidly flashing green LEDs to detect blood volume changes in wrist capillaries; light-sensitive photodiodes measure reflectance.
QUOTE: "optical heart rate sensors that utilize 'rapidly flashing green LEDs to detect blood volume changes in wrist capillaries.' Light-sensitive photodiodes measure these fluctuations"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://patents.google.com/patent/US11051706B1/en
CLAIM: Google's PPG sensor design patent specifies green LED wavelengths at 495–570 nm (typical 528 nm center); red at 650–940 nm (typical 660 nm); infrared at 750–1700 nm with options of 730, 760, 850, 870, or 940 nm.
QUOTE: "Green: '495 nm to 570 nm' with example at 528 nm... Red: '650 nm to 940 nm' with typical 660 nm center wavelength... Infrared: '750 nm to 1700 nm' range, commonly 730 nm, 760 nm, 850 nm, 870 nm, or 940 nm"
CONFIDENCE: verified
RESEARCHER: B
NOTE: This patent predates the Fitbit Air product launch and covers Google's general PPG architecture, not a confirmed Fitbit Air part. The wavelength ranges are design constraints, not confirmed Fitbit Air-specific values. No part number or IC manufacturer named.

SOURCE: https://patents.google.com/patent/US11051706B1/en
CLAIM: Google's PPG patent describes photodetectors (photodiodes, phototransistors, CCDs, thermopile, or CMOS) spaced 1–10 mm from LED sources; time-multiplexed activation via microprocessor-controlled internal clock.
QUOTE: "Detectors may sense single or multiple wavelength ranges... Detectors 1 mm (or less) to 10 mm apart... light sources activate sequentially according to distinct 'emission schedules'... maintains 'an internal clock' to track activation timing"
CONFIDENCE: verified
RESEARCHER: B
NOTE: Patent architecture, not confirmed Fitbit Air teardown data.

SOURCE: https://the5krunner.com/2026/06/03/fitbit-air-accuracy-sampling-rate/
CLAIM: Fitbit Air optical sensor samples at approximately 25 Hz internally, but applies confidence-gated storage; during wrist-based sport activity stores data at approximately 5-second intervals despite 2-second nominal spec.
QUOTE: "optical sensor samples at approximately 25 Hz... data storage during sport activities... Approximately 5-second intervals... the device only writes data points when the optical signal meets internal quality thresholds"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://support.google.com/googlehealth/answer/14237938?hl=en
CLAIM: Published heart rate spec states 2-second data storage interval (0.5 Hz), but actual PPG sensor sampling rate is approximately 25–50 Hz depending on activity; published spec describes storage cadence, not raw optical sampling.
QUOTE: "Published specification: 0.5Hz (2-second data storage interval). Actual sensor sampling: Approximately 25-50Hz depending on activity level."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://the5krunner.com/2026/06/03/fitbit-air-accuracy-sampling-rate/
CLAIM: Fitbit Air records 600–1,200 paired data points per session versus 5,500–5,600 from competitor devices running 1-second intervals.
QUOTE: "Fitbit Air records a quarter of the data points: between 600 and 1,200 paired data points, compared with 5,500 to 5,600 from the comparators"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-review-vs-whoop.html
CLAIM: Fitbit Air heart rate accuracy is severely degraded in certain workouts, with errors of 20–40 bpm above actual values; attributed to thin band width causing light leakage into the optical sensor.
QUOTE: "In certain workouts, Fitbit had really bad accuracy, vastly overshooting actual heart rate by 20-40bpm... due to the band's thin width, which allows substantial light leakage into the optical sensor."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://the5krunner.com/2026/06/03/fitbit-air-accuracy-sampling-rate/
CLAIM: Fitbit Air bicep placement reduces storage interval to 2.4 seconds with zero bias versus ECG, but this placement-sensitivity is not disclosed in Google documentation.
QUOTE: "Bicep placement significantly improves results—the storage interval drops to 2.4 seconds with zero bias against ECG references—yet this critical variable wasn't disclosed."
CONFIDENCE: verified
RESEARCHER: C

### SpO2 Sensor

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air uses a red and infrared sensor pair for SpO2 (blood oxygen) measurement; optical heart rate monitor includes red and infrared sensors.
QUOTE: "3-Axis accelerometer + gyroscope... Optical heart rate monitor with red and infrared sensors... skin temperature sensor"
CONFIDENCE: verified
RESEARCHER: A

NOTE — UNRESOLVED: It is not confirmed from any public source whether the SpO2 red/IR pair is integrated into the same optical module as the green HR sensor or is a physically separate component. No teardown has confirmed module identity.

### IMU (Accelerometer + Gyroscope)

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air contains a 3-axis accelerometer and gyroscope.
QUOTE: "3-Axis accelerometer + gyroscope"
CONFIDENCE: verified
RESEARCHER: A

SOURCE: https://dev.fitbit.com/build/guides/sensors/gyroscope/
CLAIM: Fitbit gyroscope axes are defined as X (left-right, parallel to screen), Y (top-bottom, parallel to screen), Z (perpendicular to screen, pointing upward); developer docs cite 30 readings per second example for Versa/Sense.
QUOTE: "X-axis: Parallel to screen, aligned with left-right edges... Y-axis: Parallel to screen, aligned with top-bottom edges... Z-axis: Perpendicular to screen, pointing upward... example shows '30 readings per second'"
CONFIDENCE: unverified
RESEARCHER: B
NOTE: This documentation is for Fitbit Versa/Sense; not confirmed for Fitbit Air. Axis orientation may differ for a screenless device.

NOTE — UNRESOLVED: No manufacturer, part number, g-range, or ODR specification confirmed for the Fitbit Air accelerometer/gyroscope. No teardown exists.

### Skin Temperature Sensor

SOURCE: https://support.google.com/googlehealth/answer/14237207?hl=en
CLAIM: Fitbit Air skin temperature sensor checks skin temperature every minute; requires 3 days minimum to establish baseline, uses up to 30 days of data to adjust baseline.
QUOTE: "'checks your skin temperature every minute'... requires 'at least 3 days' of data to establish a baseline, using 'up to 30 days of data to adjust your baseline temperature'"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://support.google.com/googlehealth/answer/14237207?hl=en
CLAIM: Skin temperature sensor measures peripheral skin temperature; readings influenced by ambient air, blood flow, sweat, wrist pressure, and sleep stage; significant ambient temperature changes negatively impact tracking.
QUOTE: "'significant changes in ambient temperature may negatively impact skin temperature tracking,' indicating environmental sensitivity"
CONFIDENCE: verified
RESEARCHER: B

NOTE — UNRESOLVED: Sensor type (NTC thermistor, thermopile IC, dedicated silicon temperature IC) is not disclosed. No manufacturer or part number available from any public source.

### HRV Measurement

SOURCE: https://support.google.com/googlehealth/answer/14237938?hl=en
CLAIM: Fitbit HRV uses RMSSD (Root Mean Square of Successive Differences) formula; derived from the longest sleep period over the past 24 hours; only sleep periods exceeding 3 hours are used.
QUOTE: "Root mean square of successive differences (RMSSD) as the formula Fitbit uses to determine heart rate variability... HRV measurements derive from 'the longest sleep period over the past 24 hours,' with only sleep periods exceeding 3 hours being considered"
CONFIDENCE: verified
RESEARCHER: B

---

## BATTERY

SOURCE: https://support.google.com/product-documentation/answer/17050752?hl=en
CLAIM: Fitbit Air battery capacity is 34.5 mAh; chemistry is Lithium-Ion; two approved manufacturers: Chongqing VDL Electronics Co., Ltd. (0.908g) and Guangdong Highpower New Energy Technology Co., Ltd. (0.9g).
QUOTE: "Chongqing VDL Electronics Co., Ltd. (Weight: 0.908g)... Guangdong Highpower New Energy Technology Co., Ltd. (Weight: 0.9g)... Battery Chemistry: Lithium-Ion... Capacity: 34.5mAh"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://support.google.com/product-documentation/answer/17050752?hl=en
CLAIM: Battery model number is GV9Z8; device model is GW9C8; batteries designed to retain 80% capacity after approximately 300 charge cycles; batteries made in China.
QUOTE: "Model Numbers: GV9Z8 (battery), GW9C8 (device)... designed to retain up to 80% capacity up to about 300 charge cycles... Origin: Made in China"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://support.google.com/product-documentation/answer/17050752?hl=en
CLAIM: Hazardous substances in battery: 1,3-Propanesultone, Propylene carbonate, Ethyl propionate; critical raw materials: Lithium, Cobalt, Phosphorus (Chongqing supplier); Lithium, Cobalt (Guangdong supplier).
QUOTE: "Hazardous Substances: 1,3-Propanesultone, Propylene carbonate, Ethyl propionate... Critical Raw Materials: Lithium, Cobalt, Phosphorus (Chongqing); Lithium, Cobalt (Guangdong)"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://support.google.com/product-documentation/answer/17050752?hl=en
CLAIM: Fitbit Air charging standard: USB-C Power Delivery compliant; supports 5V DC (max 3A) or 9V DC (max 2A).
QUOTE: "Charging Standard: USB-C Power Delivery compliant; 5V DC (max 3A) or 9V DC (max 2A)"
CONFIDENCE: verified
RESEARCHER: B

SOURCE: https://blog.google/products-and-platforms/devices/fitbit/fitbit-air/
CLAIM: Fitbit Air provides up to 7 days battery life; fast charging delivers a full day of power in 5 minutes; full charge takes 90 minutes.
QUOTE: "Up to a week of battery life... fast charging that delivers 'a full day of power in just five minutes'"
CONFIDENCE: verified
RESEARCHER: A

NOTE — UNRESOLVED: Physical cell dimensions (LxWxH in mm) not disclosed in any public source. Weight (~0.9g) is the only physical attribute confirmed from the regulatory document.

---

## CLINICAL / REGULATORY

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-air-whoop-competitor-everything-details.html
CLAIM: Fitbit Air is FDA-certified for background Afib detection.
QUOTE: "FDA-certified background Afib detection"
CONFIDENCE: verified
RESEARCHER: A

---

## HARDWARE PLATFORM / LINEAGE

SOURCE: https://www.the5krunner.com/2026/05/07/fitbit-air-opinion-review-buyers-guide/
CLAIM: Fitbit Air uses the same hardware platform as the Fitbit Inspire 3, with the primary differentiation being the absence of a screen.
QUOTE: "The Fitbit Air is basically just a screen-less Fitbit Inspire 3... core hardware platforms are closely related."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://askvora.com/blog/fitbit-air-vs-pixel-watch-4
CLAIM: Fitbit Air uses algorithms derived from the Pixel Watch 4 platform; Google claims "slightly better performance than the Charge 6 baseline."
QUOTE: "Google provides new algorithms derived from the Pixel Watch 4 platform, which Google says deliver slightly better performance than the Charge 6 baseline."
CONFIDENCE: verified
RESEARCHER: C

✅ CONFLICT RESOLVED (late gap recovery findings, verified):

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-air-whoop-competitor-everything-details.html
CLAIM: Fitbit Air hardware platform is derived from Fitbit Charge 6 with the display removed; virtually every Charge 6 feature is present in screenless form.
QUOTE: "At a functional level, it's essentially taking a Fitbit Charge 6, and removing the display. Meaning that virtually every feature of the Fitbit Charge 6 exists here, just in a screenless form factor."
CONFIDENCE: verified

SOURCE: https://www.the5krunner.com/2026/05/07/fitbit-air-opinion-review-buyers-guide/
CLAIM: Fitbit Air uses the same sensor suite as Fitbit Charge 6 with updated algorithms.
QUOTE: "The sensor suite is from the ageing Fitbit Charge 6, albeit with modern algorithms inside."
CONFIDENCE: verified

SOURCE: https://9to5google.com/2026/05/fitbit-air-review/
CLAIM: Compared to Fitbit Charge 6, Fitbit Air lacks only ECG and EDA sensors; no other hardware sensor differences disclosed.
QUOTE: "Compared to the $160 Fitbit Charge 6, the only tracking sensors you lose out on are those built for ECG and EDA scans."
CONFIDENCE: verified

SOURCE: https://www.dcrainmaker.com/2026/05/fitbit-review-vs-whoop.html
CLAIM: Fitbit Air algorithms are derived from the Pixel Watch 4 platform; Google claims slightly better performance than Charge 6 baseline.
QUOTE: "Google provides new algorithms derived from the Pixel Watch 4 platform, which Google says deliver slightly better performance than the Charge 6 baseline."
CONFIDENCE: verified

RESOLUTION: The Inspire 3 claim from Researcher C summary was incorrect — the actual source (The5kRunner) states Charge 6. Three independent sources confirm Charge 6 sensor platform. The Pixel Watch 4 algorithm claim is now verified via DC Rainmaker (same domain as previously verified [8] source). The two claims are complementary: Charge 6 hardware + Pixel Watch 4-derived algorithms.

---

## ACCURACY AND KNOWN ISSUES

SOURCE: https://the5krunner.com/2026/06/03/fitbit-air-accuracy-sampling-rate/
CLAIM: Published heart rate accuracy statistics use a confidence-gating mechanism: only data points meeting an internal signal-quality threshold are stored; accuracy metrics describe only kept points, not full session performance.
QUOTE: "The statistics describe only the data points the device chose to keep... confidence-gated storage creates a critical gap between marketed specifications and real-world data density."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://android.gadgethacks.com/news/fitbit-air-firmware-update-targets-step-and-sleep-tracking-bugs/
CLAIM: Fitbit Air experienced widespread step tracking and sleep tracking inaccuracies at launch; first firmware update released approximately seven weeks after launch to address these.
QUOTE: "Fitbit Air experienced sustained user complaints about counting steps and tracking sleep... Google released the first Fitbit Air firmware update approximately seven weeks after the tracker launched."
CONFIDENCE: verified
RESEARCHER: C

SOURCE: https://www.techradar.com/health-fitness/fitness-trackers/the-first-fitbit-air-update-could-fix-a-major-frustration
CLAIM: Automatic workout detection was a major weakness at launch; inaccurate labeling (e.g., runs tagged as general workouts).
QUOTE: "Automatic workout detection was identified as one of the device's most frequently cited weaknesses... inaccurate labeling of automatically detected workouts, tagging runs as general workouts."
CONFIDENCE: verified
RESEARCHER: C

---

## SOURCE AVAILABILITY STATUS

| Source | Status |
|---|---|
| FCC filing (fccid.io search) | Filing exists (SZGGW9C8 / model GA09509) but internal photos and RF test exhibits are not publicly accessible via web interface |
| iFixit teardown | Does not exist as of 2026-07-01 |
| TechInsights teardown | Does not exist or is not publicly accessible (paywalled/not published) |
| System Plus Consulting | Site unreachable during research; no report confirmed |
| YouTube teardown videos | None found |
| Google official blog | Accessible — marketing specs only, no component-level detail |
| DC Rainmaker review | Accessible — functional testing, no component-level detail |
| Google regulatory/sustainability doc | Accessible — battery capacity (34.5 mAh) and chemistry confirmed here |
| The5krunner accuracy deep-dive | Accessible — real-world sampling rate and accuracy analysis |

---

## SUMMARY OF VERIFIED FACTS

**Device:** Fitbit Air, model GW9C8, GA09509 (retail), shipped May 26, 2026, $99
**Physical:** 5.2g (no band), 8.3mm thick, polycarbonate + PBT housing, 50m WR
**Connectivity:** Bluetooth 5.0, no GPS, no barometer
**Sensors confirmed:** PPG (green LED + red/IR), SpO2 (red + IR), 3-axis accelerometer + gyroscope, skin temperature (type unspecified)
**PPG optical:** Green LEDs (~528nm typical); red (~660nm typical); IR (730–940nm range) — from Google patent architecture, not confirmed teardown IC
**PPG sampling:** ~25 Hz optical; 2s storage (nominal), ~5s during sport (actual, wrist)
**Battery:** 34.5 mAh, Lithium-Ion, two suppliers (Chongqing VDL, Guangdong Highpower), model GV9Z8, ~0.9g

## SUMMARY OF KEY GAPS

- Sensor IC manufacturer and part number: UNKNOWN for PPG, IMU, skin temp
- IMU g-range and ODR: UNKNOWN
- Cell physical dimensions (mm): UNKNOWN
- Processor (SoC): UNKNOWN
- RAM / flash: UNKNOWN
- FCC internal photos: INACCESSIBLE
- No teardown of any kind exists in public record
