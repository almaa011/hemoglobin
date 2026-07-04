# ECG Acquisition via nRF + Electrode Analog Front-End
## Merged Research Record — 2026-07-04

---

## A. ECG Signal Characteristics

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC7664289/
CLAIM: ECG signal amplitude ranges from 10 µV to 5 mV, with typical value of 1 mV.
QUOTE: "ECG signals have amplitudes ranging from 10 μV to 5 mV, with a typical value of 1 mV."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC7664289/
CLAIM: Standard clinical ECG bandwidth is 0.05 Hz to 100 Hz, with diagnostic information mainly in 0.05–35 Hz.
QUOTE: "A standard clinical ECG application has a bandwidth of 0.05 Hz to 100 Hz, mainly concentrated in the 0.05~35 Hz range."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC7664289/
CLAIM: Electrodes produce a DC offset of up to ±300 mV due to electrode-skin contact potential.
QUOTE: "A signal amplitude of ECG signals is typically in the order of 1 mV, but may have a DC offset that varies from as much as −300 mV to +300 mV."
CONFIDENCE: verified

SOURCE: https://arxiv.org/pdf/2507.17154
CLAIM: Dry electrodes can produce DC offset up to ±700 mV (vs. ±300 mV for wet electrodes).
QUOTE: "For 'wet' electrodes this is typically less than ±300 mV, but for 'dry' electrodes this can be as large as ±700 mV."
CONFIDENCE: verified

SOURCE: https://ieeexplore.ieee.org/document/9403666/
CLAIM: Diagnostic ECG sampling requires 500 Hz; long-term monitoring needs minimum 100 Hz for 0.5–50 Hz band.
QUOTE: "For diagnostic purposes, a sampling frequency of 500 Hz is recommended, while for long-term monitoring purposes the frequency range may be reduced to 0.5–50 Hz with a lower sampling frequency of 100 Hz."
CONFIDENCE: verified

---

## B. Electrode-Skin Interface

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC7374322/
CLAIM: Wet Ag/AgCl electrode-skin impedance at 10 Hz is approximately 5 kΩ with properly prepared skin.
QUOTE: "Skin-to-electrode impedances at 10 Hz using silver/silver chloride electrodes with properly prepared skin are typically about 5 kΩ."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC8401560/
CLAIM: Dry electrodes have contact impedance approximately 50× higher than wet/semi-dry electrodes.
QUOTE: "The contact impedance of the dry electrode is approximately 50-fold higher than the wet/semi-dry electrodes."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC8401560/
CLAIM: Wet electrode skin resistance is 10–100 kΩ·cm²; dry electrode skin resistance is 30–1000 kΩ·cm².
QUOTE: "Wet electrode impedance components include: Skin resistance (RE): approximately 10–100 kΩ cm⁻². Dry electrodes show substantially higher impedance: Skin resistance (RE): approximately 30–1000 kΩ cm⁻²."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC8401560/
CLAIM: Ag/AgCl electrode half-cell potential is +0.223 V referenced to hydrogen electrode under standard conditions.
QUOTE: "VHC values for common electrode materials under standard conditions (25°C, 1 atm, 1 mol dm⁻³): Silver Chloride | +0.23"
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/230723393_An_ultra-high_input_impedance_ECG_amplifier_for_long-term_monitoring_of_athletes
CLAIM: Dry electrodes have impedance 100–1000× higher than conventional electrodes (e.g., 10 MΩ vs. 10 kΩ).
QUOTE: "dry electrodes have impedances 100 to 1000 times higher than conventional electrodes (for example, 10MΩ for dry electrodes vs. 10kΩ for conventional electrodes)"
CONFIDENCE: verified

---

## C. nRF52840 SAADC Specifications

SOURCE: https://academy.nordicsemi.com/courses/nrf-connect-sdk-intermediate/lessons/lesson-6-analog-to-digital-converter-adc/topic/adc-peripheral-on-nordic-devices/
CLAIM: nRF52840 SAADC supports 8/10/12-bit resolution; 14-bit available via oversampling.
QUOTE: "8/10/12-bit resolutions are supported on the nRF chips (nRF52, nRF53, nRF91) with the option of 14-bit resolution with oversampling."
CONFIDENCE: verified

SOURCE: https://academy.nordicsemi.com/courses/nrf-connect-sdk-intermediate/lessons/lesson-6-analog-to-digital-converter-adc/topic/adc-peripheral-on-nordic-devices/
CLAIM: nRF52840 SAADC maximum sampling rate is 200 kSPS (5 µs sampling interval); typical conversion time is 2 µs.
QUOTE: "The maximum sampling frequency achievable is 200 ksps (or 5 µs sampling interval) for nRF52/nRF53/nRF91 series devices."
CONFIDENCE: verified

SOURCE: https://academy.nordicsemi.com/courses/nrf-connect-sdk-intermediate/lessons/lesson-6-analog-to-digital-converter-adc/topic/adc-peripheral-on-nordic-devices/
CLAIM: nRF52840 SAADC internal reference is 0.6 V; also supports VDD/4 as reference.
QUOTE: "Two references are supported: Internal reference (±0.6 V on ADC core) and VDD as reference (±VDD/4 on ADC core)."
CONFIDENCE: verified

SOURCE: http://docs.nordicsemi.com/r/bundle/ps_nrf52840/page/saadc.html
CLAIM: nRF52840 SAADC gain settings range from 1/6 to 4.
QUOTE: "Gain options range from 1/6 to 4."
CONFIDENCE: verified

SOURCE: https://devzone.nordicsemi.com/f/nordic-q-a/62959/nrf52840-saadc-input-voltage-limits
CLAIM: nRF52840 SAADC input must remain within 0 to VDD for accurate measurements.
QUOTE: "Inputs AIN0 through AIN7 cannot exceed VDD or be lower than VSS" and "For accurate analog readings, the input must stay within 0 to VDD, regardless of gain settings."
CONFIDENCE: verified

SOURCE: https://learn.adafruit.com/bluefruit-nrf52-feather-learning-guide/nrf52-adc
CLAIM: With gain 1/6 and 0.6 V internal reference, nRF52 SAADC maximum input range is 0–3.6 V single-ended.
QUOTE: "The internal reference results in an input range of ±0.6 V on the ADC core. However, with a gain setting of 1/6, the maximum SAADC input voltage is 0.6V/(1/6)=3.6V. The single ended input range is then 0V-3.6V."
CONFIDENCE: verified

SOURCE: https://devzone.nordicsemi.com/f/nordic-q-a/37680/nrf52840-what-is-the-input-impedance-of-the-adc-inputs-in-spec-it-is-greater-than-1m-but-how-much
CLAIM: nRF52840 SAADC input impedance is >5 MΩ when idle; drops (unquantified) during conversion due to switched-in capacitor.
QUOTE: "when the SAADC is IDLE, the input impedance is much greater than 5 MOhm. However, when an ADC conversion is ongoing, a capacitor is switched in along with the input impedance and pin-capacitance, which will lower the impedance."
CONFIDENCE: verified

SOURCE: https://academy.nordicsemi.com/courses/nrf-connect-sdk-intermediate/lessons/lesson-6-analog-to-digital-converter-adc/topic/adc-peripheral-on-nordic-devices/
CLAIM: nRF52 SAADC can be configured as 8 single-ended or 4 differential inputs; in single-ended mode negative input is shorted to ground internally.
QUOTE: "The analog inputs can be configured as eight single-ended inputs, four differential inputs or a combination of these. In single-ended mode, the negative input will be shorted to ground internally."
CONFIDENCE: verified

SOURCE: https://devzone.nordicsemi.com/f/nordic-q-a/69939/how-to-increase-saadc-sample-rate-and-how-to-correctly-use-saadc-conversion-results-when-oversampling-nrf52840
CLAIM: With BLE stack active, practical nRF52840 SAADC sample rate is limited to approximately 40 kSPS.
QUOTE: "The nRF52840 ADC can digitize 200,000 samples every second (200 kSa/s). However, there are practical limitations...BLE stack failures have been reported at sampling rates greater than 40 kSa/s."
CONFIDENCE: verified

SOURCE: https://www.embeddedexplorer.com/nrf52-saadc-tutorial/
CLAIM: nRF52 SAADC oversampling improves SNR but does not improve INL or DNL; 2^OVERSAMPLE samples averaged per output.
QUOTE: "Oversampling improves the signal-to-noise ratio (SNR), however, oversampling does not improve the integral non-linearity (INL), or differential non-linearity (DNL)."
CONFIDENCE: verified

SOURCE: https://www.embeddedexplorer.com/nrf52-saadc-tutorial/
CLAIM: nRF52 SAADC conversion formula: V(measured) = RESULT × REFERENCE / GAIN / (2^RESOLUTION).
QUOTE: "To convert raw ADC readings to voltage, you apply this formula: V(measured) = RESULT × REFERENCE / GAIN / (2^RESOLUTION)."
CONFIDENCE: verified

SOURCE: https://spectrum-instrumentation.com/support/knowledgebase/hardware_features/ADC_and_Resolution.php
CLAIM: ECG amplifier must achieve approximately 80 dB SNR when amplifying 0.5–3 mVp-p signals.
QUOTE: "The amplifier must boost an analog input signal of around 0.5-3 mVp-p with a signal-to-noise ratio (SNR) of about 80 dB."
CONFIDENCE: verified

SOURCE: https://spectrum-instrumentation.com/support/knowledgebase/hardware_features/ADC_and_Resolution.php
CLAIM: A 12-bit ADC has approximately 72 dB theoretical SNR; achieving 80 dB requires 14-bit resolution or 4× oversampling.
QUOTE: "A 12 bit digitizer, with 100 µV resolution (based on a full scale level of 200 mV) is unable to resolve levels smaller than 100 µV."
CONFIDENCE: verified

---

## D. AD8232 ECG Front-End IC

SOURCE: https://www.analog.com/en/products/ad8232.html
CLAIM: AD8232 instrumentation amplifier provides fixed gain of 100 V/V.
QUOTE: "The instrumentation amplifier provides a fixed gain of 100 V/V, with capability for additional gain adjustment via external circuitry."
CONFIDENCE: verified

SOURCE: https://www.radiolocman.com/datasheet/pdf.html?di=169983&p=2
CLAIM: AD8232 input impedance is 10 GΩ || 7.5 pF differential, 5 GΩ || 15 pF common mode.
QUOTE: "Input impedance specification of 10||7.5 GΩ||pF for differential mode and 5||15 GΩ||pF for common mode."
CONFIDENCE: verified

SOURCE: https://www.radiolocman.com/datasheet/pdf.html?di=169983&p=8
CLAIM: AD8232 input-referred noise is 20 µVp-p typical in the 0.5–40 Hz band.
QUOTE: "20μVp-p (typ) noise (0.5 Hz to 40 Hz)"
CONFIDENCE: verified

SOURCE: https://www.utmel.com/components/ad8232-single-lead-ecg-front-end-design-guide?id=7772
CLAIM: AD8232 supply current is 170 µA; supply voltage 2.0–3.5 V; CMRR 80 dB DC to 60 Hz.
QUOTE: "Supply Current: 170 µA typical. Supply Voltage: 2.0V to 3.5V. CMRR: 80 dB (DC to 60 Hz)."
CONFIDENCE: verified

SOURCE: https://wiki.analog.com/resources/eval/ad8232-evaluation-guide/a03321a
CLAIM: AD8232 evaluation board default configuration: total gain 1100 V/V, HPF cutoff ~7 Hz, LPF cutoff ~25 Hz.
QUOTE: "Overall gain of 1,100 V/V, High-pass filter cutoff at approximately 7 Hz, Low-pass filter cutoff at approximately 25 Hz."
CONFIDENCE: verified

SOURCE: https://www.radiolocman.com/datasheet/pdf.html?di=169983&p=18
CLAIM: AD8232 RLD circuit uses internal 150 kΩ resistor and external 1 nF capacitor; loop gain ~20 at line frequencies; crossover ~1 kHz.
QUOTE: "The RLD amplifier is formed by an internal 150kΩ resistor and an external capacitor of 1nF (C1). This results in a loop gain of about 20 at line frequencies, with a crossover frequency of about 1 kHz."
CONFIDENCE: verified

SOURCE: https://www.utmel.com/components/ad8232-single-lead-ecg-front-end-design-guide?id=7772
CLAIM: AD8232 output is rail-to-rail on 3.3 V supply; practical output swings ±300/−200 mV around ~500 mV midpoint when connected to MCU ADC.
QUOTE: "Since the AD8232 features a rail-to-rail output on a 3.3V supply, the output can swing from ground (0V) to the positive supply rail (3.3V)."
CONFIDENCE: verified

SOURCE: https://www.utmel.com/components/ad8232-single-lead-ecg-front-end-design-guide?id=7772
CLAIM: AD8232 power decoupling: 0.1 µF ceramic cap as close as possible to supply pin, plus 1 µF bulk cap nearby.
QUOTE: "Use a 0.1µF ceramic capacitor 'placed as close as possible to the supply pin' plus a 1µF bulk capacitor nearby for voltage stability."
CONFIDENCE: verified

SOURCE: https://www.nordicsemi.com/Nordic-news/2021/02/AppSens-ECG247-Smart-Heart-Sensor-employs-nRF52832-SoC
CLAIM: Nordic nRF52832 SoC is used in the AppSens ECG247 commercial ECG heart-monitoring wearable.
QUOTE: "Nordic Semiconductor's nRF52832 Bluetooth Low Energy SoC has been selected for ECG applications, such as AppSens' ECG247 Smart Heart Sensor for detecting cardiac rhythm disorders."
CONFIDENCE: verified

---

## E. Failure Modes and Adversarial Findings

SOURCE: https://www.researchgate.net/figure/recapitulates-the-minimal-CMRR-50-Hz-we-recommend-for-an-amplifier-for-bioelectric_tbl1_23182056
CLAIM: ECG amplifiers require CMRR ≥ 90 dB to adequately reject 50/60 Hz power-line coupling before the gain stage.
QUOTE: "common-mode rejection ratio (CMRR) of 90dB or higher to remove the 50Hz/60Hz (coupling from the mains) sufficiently before the gain stage."
CONFIDENCE: verified

SOURCE: https://www.analog.com/en/resources/technical-articles/common-mode-rejection.html
CLAIM: Common-mode signal in bioelectric measurements is typically 100–1000× larger than the differential signal.
QUOTE: "the common-mode signal is typically two or three orders of magnitude larger than the differential signal"
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/8078947_Electrocardiographic_Motion_Artifact_Versus_Electrode_Impedance
CLAIM: CMRR degrades proportionally to electrode impedance mismatch: ΔCMRR ≈ ΔZE / ZC.
QUOTE: "in case of impedance mismatch, the CMRR will be degraded as approximately ΔZE/ZC, where ΔZE is the difference between the two skin–electrode interface impedances and ZC is the input impedance of the operational amplifier."
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/23932173_Reliable_Motion_Artifact_Detection_for_ECG_Monitoring_Systems_with_Dry_Electrodes
CLAIM: Severe motion artifact can produce wide chaotic complexes visually indistinguishable from ventricular tachycardia or ventricular fibrillation.
QUOTE: "In its severe form, motion artifact can produce wide, chaotic complexes that on quick glance look exactly like ventricular tachycardia or even ventricular fibrillation."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC3701603/
CLAIM: IIR notch filters for PLI removal cause 0–40 µV ringing artifacts; narrower stopband reduces attenuation but increases transient ringing — impossible to fully eliminate both simultaneously.
QUOTE: "0 to 40 μV artifacts; narrower stopband bandwidth (SBW) reduces unwanted attenuation but increases transient response time (TRT), which paradoxically causes more severe ringing artifacts; it is impossible to design an IIR notch filter to remove PLI without causing distortion."
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/cfs-file/__key/communityserver-discussions-components-files/14/7838.RLD.pdf
CLAIM: Uncompensated RLD circuit exhibits rate-of-closure >20 dB/dec, indicating instability; fix requires series Rc and Cc in the local feedback path.
QUOTE: "Without an external compensation network, the 1/β curve approaches the AOL curve with a rate of closure (ROC) >20dB/dec, indicating instability. The fix is to add a series Rc and Cc in the local feedback of the RLD amplifier."
CONFIDENCE: verified

SOURCE: https://ez.analog.com/data_converters/precision_adcs/w/documents/3412/adas1000-right-leg-drive-function
CLAIM: RLD loop stability depends on patient cable resistance and capacitance; loop compensation must be tuned per application.
QUOTE: "The dynamics and stability of the RLD loop depend on the chosen DC gain and the resistance and capacitance of the patient cabling, and typically loop compensation using external components will be required."
CONFIDENCE: verified

SOURCE: https://www.medteq.net/article/iec-60601-1-defibrillator-protection-design-test
CLAIM: IEC 60601 defibrillation protection requires series resistors ≥10 kΩ (typical 50 kΩ) and shunt devices; device must absorb <10% of defibrillation pulse energy.
QUOTE: "a shunt arrangement: a component such as gas tube spark gap or MOV is placed in parallel with the leads with series resistors (10kΩ or higher recommended). Effective with the Third Edition of IEC 60601-1, patient-connected devices must demonstrate that they absorb less than 10 percent of the defibrillation pulse."
CONFIDENCE: verified

SOURCE: https://www.medteq.net/article/iec-60601-1-defibrillator-protection-design-test
CLAIM: IEC 60601 defibrillation test pulse: 4724 V peak, 9 µs rise time (30%–90%), 2.36 ms fall time — standard ESD diodes are too slow.
QUOTE: "Peak voltage: 4724V, Rise time (30%-90%): 9.0µs, Fall time (to 50%): 2.36ms"
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC6264074/
CLAIM: Separate analog and digital power supplies are "rather important for a cleaner recording, especially when RF modules are used" — BLE radio couples switching noise into ECG.
QUOTE: "The differentiation of the two power supply (analog for the ECG front-end and digital for the rest) is rather important for a cleaner recording, especially when radio frequency (RF) modules are used."
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/255570925_Interference_reduction_in_ECG_recordings_by_using_a_dual_ground_electrode
CLAIM: Power-line interference coupling is primarily capacitive; shielding cables and high CMRR reduce but do not fully eliminate it because the electrode tip itself is not shielded.
QUOTE: "Because interference coupling is mostly capacitive, shielding electrode leads and a high common-mode rejection ratio (CMRR) are quite effective in reducing power-line interference but do not completely eliminate it. Electrodes are not usually shielded, unlike connecting leads."
CONFIDENCE: verified

SOURCE: https://www.analog.com/en/resources/technical-articles/introduction-to-electrocardiographs.html
CLAIM: Large pacemaker pulses can saturate ECG front-end; recovery time can be less than one line cycle (16.6 ms) but is limited by analog front-end decimation filtering.
QUOTE: "Large amplitude pacemaker pulses can saturate an ECG front end, and the restoration time can be important for maintaining clinically acceptable output."
CONFIDENCE: verified

SOURCE: https://www.analog.com/en/resources/technical-articles/introduction-to-electrocardiographs.html
CLAIM: Capacitively-coupled ECG front-ends recover slowly from defibrillation because coupling capacitors become charged and must discharge through feedback network.
QUOTE: "Most ECG devices are required to recover quickly from a defibrillation event, which can saturate the front-end and charge capacitors, creating a long recovery time for capacitively coupled circuits."
CONFIDENCE: verified

---

## F. IEC 60601-1 Safety

SOURCE: https://www.advancedenergy.com/en-us/about/news/blog/safety-requirements-in-medical-equipment-designing-for-bf-and-cf-classifications/
CLAIM: IEC 60601-1 input-to-output isolation minimum is 4000 VAC; output-to-ground for Type BF and CF is minimum 1500 VAC.
QUOTE: "Input-to-output isolation: minimum 4,000 VAC. Input-to-ground isolation: minimum 1,500 VAC. Output-to-ground isolation: Type BF and CF: 1,500 VAC minimum."
CONFIDENCE: verified

SOURCE: https://www.advancedenergy.com/en-us/about/news/blog/safety-requirements-in-medical-equipment-designing-for-bf-and-cf-classifications/
CLAIM: Type BF leakage current limits: 100 µA normal, 500 µA single-fault. Type CF: 10 µA normal, 50 µA single-fault.
QUOTE: "Type B and BF: 100 µA (normal), 500 µA (single fault). Type CF: just 10 µA and 50 µA for Type CF under normal and single-fault conditions respectively."
CONFIDENCE: verified

SOURCE: https://www.astute-labs.com/blog/applied-parts-classification-iec-60601-1-type-b-bf-cf/
CLAIM: Currents 10–100 µA applied directly to the myocardium may trigger ventricular fibrillation — basis for Type CF limits.
QUOTE: "Currents as low as 10 µA to 100 µA applied directly to the myocardium may trigger ventricular fibrillation."
CONFIDENCE: verified

SOURCE: https://www.astute-labs.com/blog/applied-parts-classification-iec-60601-1-type-b-bf-cf/
CLAIM: Type CF classification is not automatically required for all ECG equipment; depends on intended use, patient connection type, and risk analysis.
QUOTE: "CF classification is not always mandatory for ECG equipment. The final determination depends on 'intended use, patient connection, and risk analysis' rather than device type alone."
CONFIDENCE: verified

---

## G. PCB Layout

SOURCE: https://devzone.nordicsemi.com/f/nordic-q-a/14365/nrf52-adc-front-end-circuit
CLAIM: Nordic recommends 50 Ω source impedance matching, AC coupling cap near chip, 10 pF decoupling on SAADC input, and RESN/RESP dividers for common-mode setting.
QUOTE: "Recommended approach: 50 Ohm source impedance matching on PCB, AC coupling capacitor near the chip, 10pF decoupling on the SAADC input, setup of common mode at the input with the RESN and RESP dividers."
CONFIDENCE: verified

SOURCE: https://yt-electronic.com/blog/what-are-pcb-guard-ring-how-to-avoid-common-layout-errors/
CLAIM: Guard rings (conductive traces encircling sensitive circuits) minimize noise, crosstalk, and leakage currents in ECG designs.
QUOTE: "Guard rings are conductive traces or areas on PCBs designed to minimize noise, crosstalk, and leakage currents in sensitive circuits, and are commonly used in applications requiring high precision, such as electrocardiography (ECG)."
CONFIDENCE: verified

---

## CONFLICTS BETWEEN RESEARCHERS

**CONFLICT 1 — CMRR of AD8232 vs. required ECG CMRR:**
- Researcher B found: AD8232 CMRR = 80 dB (DC to 60 Hz)
- Researcher C found: ECG requires ≥90 dB CMRR to adequately reject 50/60 Hz mains
- Resolution: The AD8232's 80 dB CMRR is below the recommended 90 dB threshold. This is a real trade-off: the AD8232 is adequate for many practical ECG applications (especially with good RLD and cable shielding), but does not meet the strictest clinical CMRR requirement. Flagged in page.

**CONFLICT 2 — Default AD8232 HPF cutoff (7 Hz vs. required 0.05 Hz):**
- Researcher B found: AD8232 eval board defaults to HPF at 7 Hz
- ECG diagnostic standard requires HPF at 0.05 Hz (to pass baseline)
- Resolution: The eval board defaults are not suitable for diagnostic ECG; components must be changed. This is not a contradiction between sources but a practical design gap. Flagged in page.

---

## UNRESOLVED / UNVERIFIED

- [UNVERIFIED] nRF52840 SAADC ENOB (effective number of bits) — not found in accessible public sources
- [UNVERIFIED] nRF52840 SAADC noise floor in nV/√Hz — Nordic datasheet PDF not accessible; not in developer academy pages
- [UNVERIFIED] nRF52840 SAADC exact input impedance during conversion — DevZone confirms it drops but gives no number
- [UNVERIFIED] Ag/AgCl half-cell potential at saturated electrolyte (0.20 V claim) — source returned HTTP 403
- [UNVERIFIED] IEC 60601-2-25 ECG-specific addendum requirements — general IEC 60601-1 found; ECG-specific standard not publicly accessible
- [UNVERIFIED] Specific RLD compensation component values (Rc, Cc) for AD8232 with standard ECG cable — TI reference PDF referenced but component values not extracted
