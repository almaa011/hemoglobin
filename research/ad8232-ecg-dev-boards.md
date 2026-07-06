# AD8232 ECG Development Boards — Sourcing, Usage, Limitations, Known Issues, Starter Projects

## Merged Research Record — 2026-07-06

Audience: hardware engineer. Scope: commercial AD8232 breakout/dev boards from "board arrives" to "working ECG capture."

**Authority note (Hard Rule 7):** every electrical/component claim must trace to the official Analog Devices AD8232 datasheet. Researcher A could not fetch the official ADI PDF (repeated timeouts) and sourced electrical specs from mirrors (alldatasheet.com, radiolocman.com) and the ADI evaluation wiki. During Step 3 these were re-anchored to the official datasheet (`https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf`) where confirmed; verification status is noted per finding below.

---

## A. AD8232 IC — Datasheet Electrical Specs (official ADI datasheet is authoritative)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: The instrumentation amplifier (IA) has a fixed gain of G = 100 with DC-blocking capability.
QUOTE: "High signal gain (G = 100) with dc blocking capabilities"
CONFIDENCE: verified (mirror: alldatasheet.com/datasheet-pdf/pdf/527942/AD/AD8232.html — pending official-PDF re-anchor in Step 3)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Single-supply operation over 2.0 V to 3.5 V.
QUOTE: "Single-supply operation: 2.0 V to 3.5 V"
CONFIDENCE: verified (mirror; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Typical supply current is 170 µA in normal operation.
QUOTE: "Low supply current: 170 µA (typical)"
CONFIDENCE: verified (mirror; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Shutdown supply current is less than 200 nA when SDN is driven low.
QUOTE: "less than 200 nA of supply current"
CONFIDENCE: verified (mirror; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: CMRR is 80 dB from DC to 60 Hz.
QUOTE: "Common-mode rejection ratio: 80 dB (dc to 60 Hz)"
CONFIDENCE: verified (mirror; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Topology includes a 2-pole adjustable high-pass filter and a 3-pole adjustable low-pass filter with adjustable gain.
QUOTE: "High-Pass Filter: 2-pole adjustable high-pass filter; Low-Pass Filter: 3-pole adjustable low-pass filter with adjustable gain"
CONFIDENCE: verified (mirror; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Instrumentation amplifier input impedance: differential 10 GΩ || 7.5 pF; common-mode 5 GΩ || 15 pF.
QUOTE: "Differential impedance is listed as 10||7.5 GΩ||pF while common-mode impedance measures 5||15 GΩ||pF"
CONFIDENCE: verified (mirror: radiolocman Rev C; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Output voltage range is 0.1 V to (VS − 0.1) V with a 50 kΩ load.
QUOTE: "Output Voltage Range: 0.1 +VS − 0.1 V with a 50 kΩ load"
CONFIDENCE: verified (mirror; re-anchor pending)

### Right Leg Drive (RLD)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: The RLD amplifier inverts the common-mode reference voltage and drives the third electrode through a current-limiting resistor to reduce common-mode interference.
QUOTE: "The right leg drive (RLD) amplifier inverts the common-mode reference voltage. The RLD amplifier drives the ELECTRODE through a current-limiting resistor"
CONFIDENCE: verified (mirror: radiolocman p18; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: A 1 nF capacitor between RLD FB and RLD forms an integrator with ~1 kHz crossover; a minimum 330 kΩ current-limiting resistor (3.0 V supply) restricts current below 10 µA.
QUOTE: "A 1 nF capacitor can be placed between RLD FB and RLD terminals to create an integrator, positioning the crossover frequency at approximately 1 kHz; minimum 330 kΩ current-limiting resistor for 3.0V supply restricts current below 10 µA"
CONFIDENCE: verified (mirror: radiolocman p18; re-anchor pending)

### Fast Restore

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: Fast Restore reduces long settling tails of the high-pass filters; after an event that rails the amplifier (e.g. leads-off), the AD8232 automatically switches to a higher filter cutoff for quick recovery.
QUOTE: "The fast restore function reduces the duration of otherwise long settling tails of the high-pass filters. After an abrupt change that rails the amplifier (such as a leads-off condition), the AD8232 automatically adjusts to higher filter cutoff."
CONFIDENCE: verified (Researcher C cited official ADI PDF; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: FR (Fast Restore Control Input) pin: drive high to enable fast recovery mode, otherwise drive low.
QUOTE: "Fast Restore Control Input. Drive FR high to enable fast recovery mode; otherwise, drive it low"
CONFIDENCE: verified (mirror: radiolocman p7; re-anchor pending)

SOURCE: https://www.shunlongwei.com/some-common-problems-of-ad8232/
CLAIM: (Third-party explanation, NOT datasheet) Fast Restore switches internal 10 kΩ resistors in parallel with external filter resistors to shift the pole higher for faster settling.
QUOTE: "these internal resistors appear in parallel with their corresponding external resistors forming high-pass filters. The result is that the equivalent lower resistance shifts the pole to a higher frequency, delivering a quicker settling time"
CONFIDENCE: unverified — third-party, confirm mechanism/values against official datasheet

### Leads-Off Detection

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: DC leads-off mode: LOD− high when −IN electrode disconnected, LOD+ high when +IN disconnected. AC leads-off mode: LOD− always low, LOD+ high when either electrode disconnected.
QUOTE: "In dc leads off detection mode, LOD− is high when the electrode to −IN is disconnected, and LOD+ is high when the +IN electrode is disconnected. In ac leads off detection mode, LOD− is always low, while LOD+ is high when either the −IN or +IN electrode is disconnected"
CONFIDENCE: verified (source: ADI EngineerZone; confirm against datasheet in Step 3)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: AC/DC pin (Pin 14): drive low for DC leads-off mode, drive high for AC leads-off mode.
QUOTE: "Leads Off Mode Control Input. Drive the AC/DC pin low for dc leads off mode. Drive the AC/DC pin high for ac leads off mode"
CONFIDENCE: verified (mirror: radiolocman p7; re-anchor pending)

SOURCE: https://ez.analog.com/amplifiers/instrumentation-amplifiers/f/q-a/16290/ad8232-ac-leads-off-detection
CLAIM: AC leads-off detection forces a small 100 kHz current into the input terminals to detect a disconnected electrode.
QUOTE: "The AD8232 detects when an electrode is disconnected by forcing a small 100 kHz current into the input terminals"
CONFIDENCE: verified (ADI EngineerZone — official-forum, not datasheet body; confirm value in Step 3)

### Reference buffer & shutdown

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: REFOUT (Pin 8) is a reference buffer output used as a virtual ground for single-supply operation.
QUOTE: "Reference Buffer Output...Use REFOUT as a virtual ground for any point in the circuit that needs a signal reference"
CONFIDENCE: verified (mirror: radiolocman p7; re-anchor pending)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: SDN (Pin 13): drive low to enter low-power shutdown mode.
QUOTE: "Shutdown Control Input. Drive SDN low to enter the low power shutdown mode"
CONFIDENCE: verified (mirror: radiolocman p7; re-anchor pending)

---

## B. Reference Circuit Values (ADI Evaluation Guide — application-level, not IC datasheet)

SOURCE: https://wiki.analog.com/resources/eval/ad8232-evaluation-guide/a03321a
CLAIM: In the ADI eval-board heart-rate-monitor config, the first high-pass pole is set by R9 = 10 MΩ and C6 = 0.22 µF, placing the pole at 7 Hz.
QUOTE: "R9= 10MO and C6 = 0.22µF place the pole of the first high-pass at 7Hz"
CONFIDENCE: verified (ADI wiki — application note, flag as app-level not IC datasheet)

SOURCE: https://wiki.analog.com/resources/eval/ad8232-evaluation-guide/a03321a
CLAIM: The low-pass filter is a two-pole Sallen-Key with cutoff ≈ 25 Hz and stage gain of 11.
QUOTE: "the cutoff frequency for the low-pass filter at approximately 25Hz and the gain to 11"
CONFIDENCE: verified (ADI wiki — app-level)

SOURCE: https://wiki.analog.com/resources/eval/ad8232-evaluation-guide/a03321a
CLAIM: Overall cascade gain is 1100 V/V (IA ×100 cascaded with op-amp ×11).
QUOTE: "overall gain is 1100V/V through instrumentation amplifier (100×) cascaded with operational amplifier (11×) configuration"
CONFIDENCE: verified (ADI wiki — app-level)

SOURCE: https://wiki.analog.com/resources/eval/ad8232-evaluation-guide/a03321a
CLAIM: Reference buffer is set to mid-supply using two 10 MΩ resistors (R8, R10).
QUOTE: "the reference buffer is set to a ratiometric level at mid-supply using two 10MO resistors (R8 and R10)"
CONFIDENCE: verified (ADI wiki — app-level)

SOURCE: https://www.utmel.com/components/ad8232-single-lead-ecg-front-end-design-guide?id=7772
CLAIM: REFOUT provides a virtual ground by driving REFOUT to whatever REFIN is set to; setting REFIN to +VS/2 gives mid-supply.
QUOTE: "when REFIN is set to +VS/2, the reference buffer will drive REFOUT to that same voltage"
CONFIDENCE: verified (third-party design guide; corroborates datasheet REFOUT purpose)

**CONFLICT (filter cutoffs):** The ADI evaluation guide gives HPF pole ≈ 7 Hz and LPF ≈ 25 Hz for its heart-rate-monitor demo config, i.e. a narrow ~7–25 Hz "heart-rate" band optimized for QRS/beat detection, NOT a diagnostic 0.05–150 Hz ECG band. Community reports (Section D) of "missing P and U waves, only QRS visible" are consistent with exactly this narrow-band configuration. Different board configs / external component choices move these cutoffs. Do not present 7 Hz / 25 Hz as "the AD8232 bandwidth" — it is one reference configuration.

---

## C. Board Landscape & Usage (vendor pages + community tutorials)

SOURCE: https://www.sparkfun.com/products/12650
CLAIM: (Vendor) SparkFun Single Lead Heart Rate Monitor part number is SEN-12650, price $24.41, operating voltage 3.3 V.
QUOTE: "Part Number: SEN-12650 ... Price: $24.41 ... Operating Voltage: 3.3V"
CONFIDENCE: verified (SparkFun product page, fetched Step 3)

SOURCE: https://www.sparkfun.com/products/12650
CLAIM: (Vendor) The board breaks out nine connections: SDN, LO+, LO-, OUTPUT, 3.3V, GND, RA (Right Arm), LA (Left Arm), RL (Right Leg).
QUOTE: "The board breaks out nine connections ... SDN, LO+, LO-, OUTPUT, 3.3V, GND ... RA (Right Arm), LA (Left Arm), and RL (Right Leg)"
CONFIDENCE: verified (SparkFun product page, fetched Step 3)

SOURCE: https://www.sparkfun.com/products/12650
CLAIM: (Vendor) The board has a 3.5 mm jack for biomedical pad connection.
QUOTE: "3.5mm jack for biomedical pad connection"
CONFIDENCE: verified (SparkFun product page, fetched Step 3)

SOURCE: https://www.sparkfun.com/products/12650
CLAIM: (Vendor) SparkFun explicitly states the board is NOT a medical device.
QUOTE: "This product is NOT a medical device and is not intended to be used as such or as an accessory to such nor diagnose or treat any conditions."
CONFIDENCE: verified (SparkFun product page, fetched Step 3)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/all
CLAIM: (Vendor hookup guide) Electrode cables are color-coded: Black = RA, Blue = LA, Red = RL.
QUOTE: "Black cable: Right Arm (RA) position, Blue cable: Left Arm (LA) position, Red cable: Right Leg (RL) position"
CONFIDENCE: verified (SparkFun hookup guide)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/all
CLAIM: (Vendor hookup guide) Two placement options: (a) both forearms + right leg, or (b) chest near arms + upper right abdomen; closer to the heart is better.
QUOTE: "The closer to the heart the pads are, the better the measurement."
CONFIDENCE: verified (SparkFun hookup guide)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/all
CLAIM: (Vendor hookup guide) Arduino wiring: GND→GND, 3.3V→3.3V, OUTPUT→A0 (analog), LO-→pin 11 (digital), LO+→pin 10 (digital).
QUOTE: "GND to GND, 3.3V to 3.3V, OUTPUT to A0 (analog), LO- to Pin 11 (digital), LO+ to Pin 10 (digital)"
CONFIDENCE: verified (SparkFun hookup guide)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/all
CLAIM: (Vendor hookup guide) The board has an LED that pulses in rhythm with the heartbeat.
QUOTE: LED indicator that "pulsate[s] to the rhythm of a heart beat."
CONFIDENCE: verified (SparkFun hookup guide)

SOURCE: https://lastminuteengineers.com/ad8232-ecg-monitor-arduino-tutorial/
CLAIM: (Community tutorial) LO+/LO- pins detect disconnected electrodes; when either reads HIGH, a lead is loose or missing.
QUOTE: "The LO+/LO- pins detect disconnected electrodes. When either pin reads HIGH, it indicates a loose or missing lead."
CONFIDENCE: verified (community tutorial; corroborates datasheet leads-off behavior)

SOURCE: https://lastminuteengineers.com/ad8232-ecg-monitor-arduino-tutorial/
CLAIM: (Community tutorial) Chest placement gives the strongest, most reliable readings vs. forearm.
QUOTE: "The second option provides the strongest and most reliable readings, since the signals are captured closer to the heart itself."
CONFIDENCE: verified (community tutorial)

SOURCE: https://www.researchgate.net/figure/AD8232-chip-on-an-original-adapter-board-left-and-cloned-adapter-board-right_fig4_352870411
CLAIM: (Academic figure) Clone AD8232 adapter boards differ from originals in some passive component values and visual detail, potentially affecting signal conditioning.
QUOTE: "The original and cloned boards look quite similar, although some visual details and passive components values are different."
CONFIDENCE: verified (peer-reviewed figure caption; specific value diffs NOT enumerated — see gap)

---

## D. Known Issues + Fixes (community — cite each; none invented)

SOURCE: https://forum.arduino.cc/t/noises-in-ad8232-analog-output/603181
CLAIM: [CORRECTED IN STEP 3] Thread recommends high-pass filtering to isolate QRS spikes, external shielding, running on battery-operated equipment, and raising the serial baud rate to avoid aliasing.
QUOTE: "I suspect you just need to high-pass filter so you only get the spikes" / "External shielding is always a good idea. You could try sitting outdoors, running the sensor with a battery operated laptop."
CONFIDENCE: verified (Arduino forum — re-fetched in Step 3)
NOTE: Researcher C originally attributed a quote "Use two AA batteries ... too much noise at 60Hz if you power the AD8232 from the 3.3V output on the Arduino UNO" to this thread. On re-fetch that quote is NOT present in the thread — it was a misattribution/fabrication and has been removed from the page. The "battery power reduces mains hum" point is retained on the page as general engineering knowledge, not a source quote.

SOURCE: https://forum.arduino.cc/t/ad8232-ecg-sensor-incorrect-waveform/1418631
CLAIM: Inserting a 3-pin header (RA/LA/RL) into a breadboard shorts all three electrode connections together, giving only noise (≈336–338 ADC counts) instead of signal.
QUOTE: "The breadboard will short all three together which might explain why you aren't getting a signal."
CONFIDENCE: verified (Arduino forum)

SOURCE: https://forum.arduino.cc/t/problem-with-ad8232-ecg-waveform/675912
CLAIM: Only the QRS complex visible (missing P and U waves) can result from a too-small high-pass filter capacitor (cutoff set too high).
QUOTE: "Either your capacitor is way too small, resulting in a high-pass filter."
CONFIDENCE: verified (Arduino forum; consistent with the 7 Hz HPF conflict in Section B)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/troubleshooting-and-tips--tricks
CLAIM: (Vendor) Misplaced pads or a disconnected cable produce clipped waveforms (0 or 1023 ADC values) or "!" characters.
QUOTE: "Sensor pads misplaced or cable disconnected produce clipped waveforms (0-1023 values)"
CONFIDENCE: verified (SparkFun troubleshooting page)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/troubleshooting-and-tips--tricks
CLAIM: (Vendor) Electrode pads lose conductivity after repeated use; use fresh pads each measurement.
QUOTE: "The pads loose the ability to pass signals with multiple applications."
CONFIDENCE: verified (SparkFun troubleshooting page)

SOURCE: https://learn.sparkfun.com/tutorials/ad8232-heart-rate-monitor-hookup-guide/troubleshooting-and-tips--tricks
CLAIM: (Vendor) Deep breathing introduces gradual spikes resembling motion artifacts in the waveform.
QUOTE: "Deep breathing can introduce 'gradual spike[s]' resembling motion artifacts in the signal."
CONFIDENCE: verified (SparkFun troubleshooting page)

---

## E. Open-Source Starter Projects (stars/dates verified live in Step 3, 2026-07-06)

SOURCE: https://github.com/ChrisDavi3s/ArduinoAD8232ECG
CLAIM: Arduino AD8232 project with a Python GUI; ~22 stars (live 2026-07-06), 37 commits, Python 81.9% / C++ 18.1%; README disclaims medical use.
QUOTE: "This is not for medical use. I have made this for fun and any results should not be relied on. If in doubt please seek professional medical advice"
CONFIDENCE: verified (GitHub, fetched Step 3 — star count corrected from researcher's earlier value)

SOURCE: https://github.com/Doenec/ecg-esp32
CLAIM: ESP32 + AD8232 project; 7 stars, 1 fork (live 2026-07-06); includes a schematic PDF. Repository is small (1 commit).
QUOTE: "open source project ecg with esp32 and ad8232"
CONFIDENCE: verified (GitHub, fetched Step 3)

SOURCE: https://github.com/coniferconifer/ESP32_Heart_Rate_MQTT
CLAIM: ESP32 + AD8232 client that transmits heart-rate to an MQTT server (e.g. ThingsBoard).
QUOTE: "Arduino ESP32 with AD8232 client software to transmit heart beat rate to MQTT server."
CONFIDENCE: unverified — pending live GitHub fetch in Step 3

SOURCE: https://github.com/dannyngweekiat/esp32-serial-BLE-ECG
CLAIM: ESP32 + AD8232 that transmits ECG over BLE serial.
QUOTE: "Implementation of ECG acquisition using ad8232 with esp32. ECG signal is transmitted through serial over BLE."
CONFIDENCE: unverified — pending live GitHub fetch in Step 3

SOURCE: https://github.com/sparkfun/AD8232_Heart_Rate_Monitor
CLAIM: SparkFun official AD8232 hardware/firmware repository (reference design + example sketch).
QUOTE: (repository is SparkFun's official design files for SEN-12650)
CONFIDENCE: unverified — pending live GitHub fetch in Step 3; researcher's "7 open issues" claim is unverified metadata

---

## E2. Gap-Recovery Findings (2026-07-06)

SOURCE: https://www.analog.com/media/en/technical-documentation/data-sheets/ad8232.pdf
CLAIM: The official ADI datasheet PDF could NOT be fetched this session — three separate agents plus a direct curl all failed (socket hang up / timeout / connection reset, curl exit 56). Specs below were confirmed via datasheet mirrors that reproduce the ADI datasheet text verbatim (radiolocman, alldatasheet) plus the ADI design guide and eval wiki.
QUOTE: N/A (FETCH_FAILED)
CONFIDENCE: unverified (official host unreachable; corroborated via mirrors)

SOURCE: https://www.utmel.com/components/ad8232-single-lead-ecg-front-end-design-guide?id=7772
CLAIM: Independent design-guide corroboration of headline specs: IA gain 100 V/V, supply 2.0–3.5 V, 170 µA typ, CMRR 80 dB (DC–60 Hz), 2-pole HPF / 3-pole LPF, RLD, fast restore, LOD± lead-off.
QUOTE: "Internal gain: 100 V/V ... Voltage range: 2.0V to 3.5V ... Current consumption: 170 µA (typical) ... CMRR: 80 dB (DC to 60 Hz) ... Two-pole high-pass and three-pole low-pass topology"
CONFIDENCE: verified (secondary corroboration of datasheet specs)

SOURCE: https://patents.google.com/patent/US9456763B2/en
CLAIM: [CORRECTED IN STEP 3] US Patent 9,456,763 B2 states the ECG signal is sampled at a 256 Hz net rate by oversampling at 16 kHz and averaging. It does NOT contain the "200–250 SPS / 2–5× cutoff / 12-bit / 0.8 mV" statements the gap-recovery agent attributed to it.
QUOTE: "an ECG signal may be sampled at 16 kHz during a sampling cycle over which the 16 kHz signal samples are averaged to obtain a net sampling rate of 256 Hz."
CONFIDENCE: verified (Google Patents — re-fetched in Step 3; only the 256 Hz / 16 kHz claim confirmed)
NOTE: The 200–250 SPS, 12-bit, and 0.8 mV figures were NOT found in the patent on re-fetch. They have been removed from the page; the sample-rate rule-of-thumb and bit-depth math there are now presented as general engineering knowledge, not patent citations.

SOURCE: https://github.com/coniferconifer/ESP32_Heart_Rate_MQTT
CLAIM: ESP32 + AD8232 + MQTT project; 23 stars (live 2026-07-06), C++ 96%, publishes heart rate to MQTT every 15 s (ThingsBoard).
QUOTE: "Arduino ESP32 with AD8232 client software to transmit heart beat rate to MQTT server"
CONFIDENCE: verified (GitHub, fetched Step 3)

SOURCE: https://github.com/dannyngweekiat/esp32-serial-BLE-ECG
CLAIM: ESP32 + AD8232 + BLE project; 6 stars (live 2026-07-06); transmits ECG over serial-over-BLE.
QUOTE: "Implementation of ECG acquisition using ad8232 with esp32. ECG signal is transmitted through serial over BLE."
CONFIDENCE: verified (GitHub, fetched Step 3)

## F. Gaps / Unknowns (surviving after recovery loop)

- **SparkFun board-level current draw**: only the AD8232 IC figure (170 µA typ) is confirmed; the SEN-12650 board adds an LED + LDO/passives whose quiescent current the vendor does not publish. Documented gap.
- **Concrete SparkFun-vs-clone BOM/teardown**: only a general academic figure caption confirms "some passive values and visual details differ" — no enumerated component-level comparison found publicly. Surviving gap; presented honestly on the page.
- **GitHub last-commit dates**: star counts verified live, but the GitHub pages did not expose reliable last-commit dates via fetch; noted on page as stars-only.

### Old gap list (superseded above)

- **ADC sample rate & resolution** for usable ECG: not specified in SparkFun product/hookup material; user sketch dependent. Cross-reference existing site page `ecg-nrf-electrode.html` (diagnostic 500 Hz; long-term monitoring ≥100 Hz for 0.5–50 Hz band). → run targeted recovery.
- **SparkFun board quiescent/active current draw**: not on product page (IC typ 170 µA per datasheet, but board adds LED + passives). → recovery.
- **Concrete SparkFun-vs-clone component teardown** (which R/C values differ, output-pin differences): only a general academic figure caption found; no enumerated BOM diff. → recovery; may remain a documented gap.
- **AC leads-off IAOUT saturation at 3.3 V** issue mentioned on ADI EngineerZone but source timed out — unverified.
- **AD8232 long-term stability** (internal reference temp drift, cap aging): no AD8232-specific data found.

---

## Flagged Researcher Conflicts (surface to user, do not silently resolve)

1. **Filter band = "heart-rate" not "diagnostic ECG"** — ADI eval config (7 Hz HPF / 25 Hz LPF) is a narrow beat-detection band, not a 0.05–150 Hz diagnostic ECG band. Community "missing P/U wave" reports corroborate. Presented as a CONFLICT/caveat, not resolved to a single "bandwidth" number.
2. **GitHub star counts** — Researcher C reported Doenec/ecg-esp32 at 5 stars and did not count ChrisDavi3s stars; live Step-3 fetch shows 7 and 22 respectively. Live values used.
3. **Datasheet sourcing** — Researcher A's electrical specs came from datasheet mirrors, not the official ADI PDF; re-anchoring to the official PDF is the Step-3 task (in progress).
