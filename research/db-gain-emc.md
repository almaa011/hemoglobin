# dB, Gain, and EMC/EMI Testing — Merged Research Record
Date: 2026-06-26

---

## CONFLICTS FLAGGED

**CONFLICT 1 — FCC vs CISPR above 960 MHz radiated Class B:**
- Researcher A (via electronics-notes, CISPR 22): Class B above 960 MHz at 3m = 54.0 dBµV/m ≈ 501 µV/m
- Researcher C (via compliancetesting.com, FCC Part 15): Class B above 960 MHz at 3m = 300 µV/m = 49.5 dBµV/m
- These differ by ~4.5 dB. CISPR 32 and FCC Part 15 above 1 GHz are known to diverge. Page should note this difference explicitly.

**CONFLICT 2 — Pre-compliance vs formal compliance measurement delta:**
- Researcher B states pre-compliance closely predicts formal results when properly calibrated.
- Researcher C could not find primary source data quantifying the actual delta, noting it as an unresolved gap.
- Resolution: Use Researcher B's statement with appropriate caveat; do not quantify a delta without a source.

---

## MERGED VERIFIED FINDINGS

### MATHEMATICS OF dB

SOURCE: https://www.electronics-notes.com/articles/basic_concepts/decibel/basics-tutorial-formula-equation.php
CLAIM: Decibel power formula is 10 times the base-10 logarithm of power ratio.
QUOTE: "The formula is 10 log10 (P2/P1) where P2 is output power and P1 is input power."
CONFIDENCE: verified

SOURCE: https://www.electronics-notes.com/articles/basic_concepts/decibel/basics-tutorial-formula-equation.php
CLAIM: Decibel voltage formula is 20 times the base-10 logarithm of voltage ratio for equal impedances.
QUOTE: "20 log10 (V2/V1) where V2 and V1 are output and input voltages respectively."
CONFIDENCE: verified

SOURCE: https://www.electronics-notes.com/articles/basic_concepts/decibel/basics-tutorial-formula-equation.php
CLAIM: Logarithmic scale enables multiplication of ratios to be simplified to addition and subtraction.
QUOTE: "The logarithmic basis enables engineers to carry out multiplication of ratios by simple addition and subtraction."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: Power quantity decibel definition is L_P = 10 log₁₀(P/P₀) dB.
QUOTE: "Ten times the base-10 logarithm of the ratio: L_P = 10 log₁₀(P/P₀) dB."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: Root-power quantity (voltage/amplitude) decibel definition is L_F = 20 log₁₀(F/F₀) dB.
QUOTE: "For root-power quantities: L_F = 20 log₁₀(F/F₀) dB."
CONFIDENCE: verified

SOURCE: https://learnemc.com/working-with-decibels
CLAIM: −3 dB in power means half the power (×0.5); −3 dB in voltage means 70.7% of amplitude (×1/√2), a distinction often confused.
QUOTE: "−3dB means two different things depending on what you're measuring. In power: −3dB is half the power (×0.5). In voltage: −3dB is 70.7% of the amplitude (×1/√2 ≈ 0.707)."
CONFIDENCE: verified

### REFERENCE UNITS

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: dBm is power relative to 1 milliwatt reference.
QUOTE: "dBm is power relative to 1 milliwatt with 0 dBm equal to 1 mW."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: dBW is power relative to 1 watt; 1 dBW = +30 dBm.
QUOTE: "dBW is power relative to 1 watt, with the relationship: 1 dBW = +30 dBm."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: dBV is voltage measured relative to 1 volt, independent of impedance.
QUOTE: "dBV is voltage relative to 1 volt, regardless of impedance."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Decibel
CLAIM: dBµV is voltage measured relative to 1 microvolt; 60 dBµV = 0 dBmV.
QUOTE: "dBµV is voltage relative to 1 microvolt; 60 dBµV = 0 dBmV."
CONFIDENCE: verified

SOURCE: https://docs.keysight.com/kkbopen/converting-dbm-to-dbuv-in-a-50-ohm-system-588262310.html
CLAIM: Conversion from dBm to dBµV in a 50 Ω system: dBµV = dBm + 107.
QUOTE: "dBm + 107 dB = dBuV in a 50 Ω system; dBm = dBµV − 107 (50Ω)."
CONFIDENCE: verified

SOURCE: https://www.redcrab-software.com/en/Calculator/Electrics/Decibel-Voltage-Power
CLAIM: The constant 107 in the 50Ω conversion comes from: 1 mW into 50Ω gives V = 0.223 V = 223,000 µV; 20·log₁₀(223000) = 107 dB.
QUOTE: "Given a resistance of 50Ω and a power of 1 mW, V = 0.223 V = 223000 µV, and 20Log10[223000 µV] = 107 dB."
CONFIDENCE: verified

SOURCE: https://3roam.com/impedance-mismatch-loss-calculator/
CLAIM: In 75 Ω systems (video/cable TV), at the same power level voltage is 22.5% higher than in 50 Ω; the dBm-to-dBµV +107 constant does not apply to 75 Ω systems.
QUOTE: "If working with 75Ω systems (video, cable TV), substitute 75 for 50 in the calculation; at the same power level, 75Ω systems have 22.5% higher voltage than 50Ω."
CONFIDENCE: verified

SOURCE: https://www.rapidtables.com/electric/dBm.html
CLAIM: dBm is 10·log₁₀(P_mW / 1 mW); every 3 dB change doubles or halves the power.
QUOTE: "Taking 1mW as the reference power, every increase or decrease of 3dBm will double or halve the power."
CONFIDENCE: verified

### GAIN

SOURCE: https://en.wikipedia.org/wiki/Gain_(electronics)
CLAIM: Power gain expressed in decibels is 10 log10(P_out/P_in) dB.
QUOTE: "Power gain defined logarithmically as 10 log₁₀(P_out/P_in) dB."
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Gain_(electronics)
CLAIM: Voltage gain expressed in decibels is 20 log(V_out/V_in) dB when input and output impedances are equal.
QUOTE: "Voltage gain calculated as 20 log(V_out/V_in) dB when input and output impedances are equal."
CONFIDENCE: verified

SOURCE: https://www.firgelliauto.com/blogs/engineering-calculators/insertion-loss-calculator
CLAIM: Cascaded total system gain in dB is G_total = G₁ + G₂ + G₃ + ... + Gₙ — losses add arithmetically because dB is logarithmic.
QUOTE: "The total cascaded system gain can be calculated using: Gtotal = G1 + G2 + G3 + ... + Gn. The logarithmic decibel scale simplifies link budget calculations because losses add arithmetically."
CONFIDENCE: verified

SOURCE: https://www.allaboutcircuits.com/technical-articles/mismatch-loss-effect-on-radio-frequency-power-measurement-and-gain-of-cascaded-amplifiers/
CLAIM: Impedance mismatch in cascaded systems can shift actual gain by ±0.5 dB or more; example: nominal 17 dB gain ranges from 16.49 dB to 17.54 dB due to mismatch.
QUOTE: "Due to impedance mismatch in cascaded systems, the actual gain can vary, for example, from 17 - 0.51 = 16.49 dB to 17 + 0.54 = 17.54 dB."
CONFIDENCE: verified

### COMMON MISTAKES / ADVERSARIAL FINDINGS

SOURCE: https://www.redcrab-software.com/en/Calculator/Electrics/Decibel-Voltage-Power
CLAIM: Using the 10× multiplier instead of 20× on a voltage ratio underestimates by 2×; a 10:1 voltage ratio yields 20 dB correctly but only 10 dB with the wrong formula.
QUOTE: "A voltage ratio of 10:1 correctly yields 20 dB with the proper formula, but would yield only 10 dB if you mistakenly applied the power multiplier."
CONFIDENCE: verified

SOURCE: https://learnemc.com/working-with-decibels
CLAIM: −3 dB in power means half the power; −3 dB in voltage means 70.7% of amplitude; these are different and often confused when switching domains.
QUOTE: "−3dB means two different things depending on what you're measuring. In power: −3dB is half the power (×0.5). In voltage: −3dB is 70.7% of the amplitude (×1/√2 ≈ 0.707)."
CONFIDENCE: verified

### EMI RECEIVERS AND TEST EQUIPMENT

SOURCE: https://incompliancemag.com/emi-measurement-receiver-requirements-cispr-16-1-1/
CLAIM: CISPR 16-1-1 specifies peak, quasi-peak, CISPR-average, and RMS-average detectors in EMI receivers; spectrum analyzers typically have only peak and average detectors.
QUOTE: "CISPR 16-1-1 specifies the measuring (EMI) receiver, the CISPR detectors, peak, quasi-peak, average and RMS-average plus the bandwidths, accuracy and pulse response that make a reading valid."
CONFIDENCE: verified

SOURCE: https://theemcshop.com/differences-between-emi-test-receivers-and-spectrum-analyzers
CLAIM: Quasi-peak detector measurement will always be between average and peak results; quasi-peak requires ~1 second per frequency point while peak and average allow faster measurements.
QUOTE: "The quasi-peak detector measurement will always be somewhere between the results of the average and peak detector. Quasi-peak detector measurements require substantially longer test times—a measurement time of 1 second per measurement point."
CONFIDENCE: verified

SOURCE: https://www.edn.com/emi-emissions-testing-peak-quasi-peak-and-average-measurements/
CLAIM: For a 10 kHz pulse train reading 100 dBµV on peak, quasi-peak reads ~100 dBµV but RMS-average reads ~89 dBµV — an 11 dB difference.
QUOTE: "For a short pulse with a repetition frequency of 10 kHz that reads 100 dBµV when the peak detector is applied, the quasi-peak detector will roughly give the same reading (100 dBµV), but the RMS-Average detector will show 89 dBµV (100 dBµV - 11 dBµV)."
CONFIDENCE: verified

SOURCE: https://www.edn.com/emi-emissions-testing-peak-quasi-peak-and-average-measurements/
CLAIM: CISPR quasi-peak detector for 0.15–30 MHz (Bands B and C) has attack time 1 ms and decay time 160 ms.
QUOTE: "The CISPR quasi-peak detector applied to most conducted emissions measurements (0.15–30 MHz) has an attack time of 1 ms and a decay time of 160 ms."
CONFIDENCE: verified

SOURCE: https://grokipedia.com/page/Quasi-peak_detector
CLAIM: Quasi-peak detector in Band A (9 kHz–150 kHz) has 45 ms charge time and 500 ms discharge time; developed in 1939 to simulate psychoacoustic response to interference.
QUOTE: "In frequency Band A (9 kHz to 150 kHz), the quasi-peak detector uses a 45 ms charge time constant and 500 ms discharge time constant."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/what-every-electronics-engineer-needs-to-know-about-measuring-receivers/
CLAIM: EMI receivers with preselection use a bank of tunable bandpass filters before the mixer, attenuating out-of-band signals >60 dB; most spectrum analyzers lack this.
QUOTE: "A preselector typically consists of a bank of tunable bandpass filters that precedes the mixer, attenuating out-of-band signals by >60 dB. Most swept spectrum analyzers do not have preselection."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/what-every-electronics-engineer-needs-to-know-about-measuring-receivers/
CLAIM: CISPR filter bandwidths are defined at -6 dB points (200 Hz, 9 kHz, 120 kHz, 1 MHz); spectrum analyzer RBW is specified at -3 dB.
QUOTE: "CISPR filters are defined by their -6 dB bandwidths, while spectrum analyzer resolution bandwidths are traditionally specified at -3 dB. CISPR 16-1-1 specifies filter bandwidths of 200 Hz, 9 kHz, 120 kHz, and 1 MHz."
CONFIDENCE: verified

SOURCE: https://www.lisungroup.com/news/technology-news/the-difference-between-a-spectrum-analyzer-and-a-receiver.html
CLAIM: EMI receivers use discrete point-frequency scanning; spectrum analyzers use continuous sweep.
QUOTE: "Spectrum Analyzers use continuous sweep measurement technology to analyze frequencies across a wide range, while EMI Receivers employ discrete point-frequency scanning at specific intervals."
CONFIDENCE: verified

### LISN — CONDUCTED EMISSIONS TEST

SOURCE: https://www.testups.com/what-is-a-lisn-emc-testing/
CLAIM: A 5 µH LISN couples noise voltages across 50 Ω to the receiver over 150 kHz to 25 MHz; above 3 MHz, 5 µH and 50 µH LISNs have the same impedance.
QUOTE: "The 5 microhenry LISN couples voltages developed across the inductance to a 50-ohm receiver over the frequency range 150 KHz to 25 MHz. At frequencies above 3 MHz, the 5µH LISN and the 50µH LISN have the same impedance."
CONFIDENCE: verified

SOURCE: https://www.ledtestsystem.com/blogs/emi-emissions-testing-guide/
CLAIM: Conducted emissions are measured from 150 kHz to 30 MHz; CISPR 16 specifies 9 kHz RBW, max segment span 2.7 MHz, sweep time 100 ms/MHz.
QUOTE: "Conducted emissions encompass noise propagated along power or signal cables, typically measured in the frequency range of 150 kHz to 30 MHz. For the 150 kHz to 30 MHz band, the resolution bandwidth specified by CISPR 16 is 9 kHz, with a maximum segment span of 2.7 MHz and recommended sweep times of 100 ms/MHz."
CONFIDENCE: verified

### ANTENNA AND MEASUREMENT CHAIN

SOURCE: https://incompliancemag.com/antenna-factor/
CLAIM: Antenna factor (AF) is the ratio of E-field incident on the antenna divided by voltage at the antenna connector; expressed in dB/m.
QUOTE: "Antenna factor (AF) is the ratio of the magnitude of the E-field incident upon a receive antenna divided by the voltage developed at the antenna's coaxial connector in units of dB/m."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/antenna-factor/
CLAIM: AF is calibration data supplied by the antenna manufacturer and used to convert measured voltage in dBµV to field strength in dBµV/m.
QUOTE: "AF is simply a way to convert measured voltage in dBμV to measured E-field strength in dBμV/m."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/emc-bench-notes-pre-compliance-testing-for-radiated-emissions-part-2-making-the-measurement/
CLAIM: Full E-field measurement formula: E (dBµV/m) = SpecAnalyzer (dBµV) − PreampGain (dB) + CoaxLoss (dB) + AttenuatorLoss (dB) + AntFactor (dB/m).
QUOTE: "E-field (dBμV/m) = SpecAnalyzer (dBμV) – PreampGain (dB) + CoaxLoss (dB) + AttenuatorLoss (dB) + AntFactor (dB/m)."
CONFIDENCE: verified

SOURCE: https://interferencetechnology.com/antenna-selection-for-automotive-emc-emissions-and-immunity-applications-100-khz-to-18-ghz/
CLAIM: Biconical antennas cover 30–300 MHz; log-periodic covers 300–1000 MHz; BiLog covers 30 to 3 GHz; CISPR 16-1-4 prefers biconical at 30–250 MHz for lower measurement uncertainty.
QUOTE: "Biconical antennas cover 30-300 MHz typically, log-periodic antennas cover 300 to 1000 MHz typically. Biconical antennas are preferred in the range 30 MHz to 250 MHz by CISPR 16-1-4 in order to achieve a low measurement uncertainty."
CONFIDENCE: verified

SOURCE: https://dbabsorber.com/blogs/blog/radiated-emission-pre-compliance-testing
CLAIM: A broadband RF preamplifier with 20–30 dB gain is needed to bridge sensitivity gaps in entry-level analyzers for pre-compliance radiated emissions tests.
QUOTE: "A quality broadband RF preamplifier with 20-30 dB gain can bridge the gap of limited sensitivity in entry-level analyzers and dramatically improve measurement capability."
CONFIDENCE: verified

SOURCE: https://www.com-power.com/products/preamplifiers/pam-103
CLAIM: Com-Power PAM-103 preamplifier: 1 MHz–1 GHz, 33 dB gain, noise figure <3.3 dB, ±3 dB flatness, +18.3 dBm at 1 dB compression.
QUOTE: "The PAM-103 is a battery-powered broadband EMI preamplifier covering 1 MHz to 1 GHz with 33 dB gain. Noise figure < 3.3 dB with ±3 dB gain flatness."
CONFIDENCE: verified

### CABLE LOSS

SOURCE: https://www.73qrz.com/coax-loss
CLAIM: RG-58 at 144 MHz: 6.2 dB/100 ft (20.3 dB/100m); LMR-400 at 144 MHz: 1.5 dB/100 ft (4.9 dB/100m). At 1.2 GHz: RG-58 21.1 dB/100 ft, LMR-400 4.8 dB/100 ft.
QUOTE: "At 144 MHz: RG-58 = 6.2 dB, LMR-400 = 1.5 dB [per 100 feet]. At 1.2 GHz: RG-58 = 21.1 dB, LMR-400 = 4.8 dB."
CONFIDENCE: verified

SOURCE: https://basicfreetools.com/coax-cable-loss-calculator/
CLAIM: Coax loss follows Loss(dB) = [k1·√f + k2·f] × length/100ft; k1 is conductor loss (∝√f), k2 is dielectric loss (∝f).
QUOTE: "Coax cable loss follows the formula: Loss(dB) = k1 * sqrt(f) + k2 * f, multiplied by cable length per 100 feet."
CONFIDENCE: verified

SOURCE: https://www.rohde-schwarz.com/us/products/test-and-measurement/essentials-test-equipment/spectrum-analyzers/how-to-measure-cable-loss_258130.html
CLAIM: Cable loss increases linearly with length; forgetting cable loss in the measurement chain overestimates system performance.
QUOTE: "Cable loss increases linearly with length—doubling the length results in double the loss."
CONFIDENCE: verified

### EMISSION LIMITS — CISPR 22/32

SOURCE: https://www.electronics-notes.com/articles/analogue_circuits/emc-emi-electromagnetic-interference-compatibility/cispr22-en55022-standard.php
CLAIM: CISPR 22 Class A conducted emissions: 0.15–0.50 MHz: 79 dBµV QP, 66 dBµV avg; 0.50–30 MHz: 73 dBµV QP, 60 dBµV avg.
QUOTE: "Class A: 0.15–0.50 MHz: 79 dBµV (quasi-peak), 66 dBµV (average); 0.50–30.0 MHz: 73 dBµV (quasi-peak), 60 dBµV (average)."
CONFIDENCE: verified

SOURCE: https://www.electronics-notes.com/articles/analogue_circuits/emc-emi-electromagnetic-interference-compatibility/cispr22-en55022-standard.php
CLAIM: CISPR 22 Class B conducted emissions: 0.15–0.50 MHz: 66–56 dBµV QP (decreasing), 56–46 dBµV avg; 0.50–5 MHz: 56 dBµV QP, 46 dBµV avg; 5–30 MHz: 60 dBµV QP, 50 dBµV avg.
QUOTE: "Class B: 0.15–0.50 MHz: 66–56 dBµV (quasi-peak), 56–46 dBµV (average); 0.50–5.00 MHz: 56 dBµV (quasi-peak), 46 dBµV (average); 5.00–30.0 MHz: 60 dBµV (quasi-peak), 50 dBµV (average)."
CONFIDENCE: verified

SOURCE: https://www.electronics-notes.com/articles/analogue_circuits/emc-emi-electromagnetic-interference-compatibility/cispr22-en55022-standard.php
CLAIM: CISPR 22 Class A radiated (10 m): 39 dBµV/m at 30–88 MHz; 43.5 at 88–216 MHz; 46.5 at 216–960 MHz; 49.5 above 960 MHz.
QUOTE: "Class A: 30–88 MHz: 39 dBµV/m; 88–216 MHz: 43.5 dBµV/m; 216–960 MHz: 46.5 dBµV/m; Above 960 MHz: 49.5 dBµV/m."
CONFIDENCE: verified

SOURCE: https://www.electronics-notes.com/articles/analogue_circuits/emc-emi-electromagnetic-interference-compatibility/cispr22-en55022-standard.php
CLAIM: CISPR 22 Class B radiated (3 m): 40 dBµV/m at 30–88 MHz; 43.5 at 88–216 MHz; 46.0 at 216–960 MHz; 54.0 above 960 MHz.
QUOTE: "Class B: 30–88 MHz: 40 dBµV/m; 88–216 MHz: 43.5 dBµV/m; 216–960 MHz: 46.0 dBµV/m; Above 960 MHz: 54.0 dBµV/m."
CONFIDENCE: verified

SOURCE: https://www.elitetest.com/blog/emc-emi-testing/cispr-32-emissions-multimedia-equipment-end-of-cispr-22/
CLAIM: CISPR 32 replaced CISPR 22 and CISPR 13 in 2012; EU transition deadline was March 5, 2017; numerical limits are largely unchanged from CISPR 22.
QUOTE: "CISPR 32 provides more detailed information on the specific emissions limits for various ports on the DUT. The transition deadline was March 5, 2017, after which CISPR 32 became the mandatory standard for presumption of conformity in the EU."
CONFIDENCE: verified

### EMISSION LIMITS — FCC PART 15

SOURCE: https://compliancetesting.com/fcc-part-15-class-a-class-b-limits/
CLAIM: FCC Part 15 Class B radiated limits at 3 m: 100 µV/m (30–88 MHz); 150 µV/m (88–216 MHz); 210 µV/m (216–960 MHz); 300 µV/m (>960 MHz).
QUOTE: "Class B Devices [at 3 meters]: 30-88 MHz: 100 µV/m; 88-216 MHz: 150 µV/m; 216-960 MHz: 210 µV/m; Above 960 MHz: 300 µV/m."
CONFIDENCE: verified

SOURCE: https://compliancetesting.com/fcc-part-15-class-a-class-b-limits/
CLAIM: FCC Part 15 Class A limits measured at 10 m; Class A is less stringent than Class B because of measurement distance difference (10 m vs 3 m).
QUOTE: "Class A devices are designed for commercial/industrial/business environments and have less stringent limits. Class A uses 10 meters while Class B uses 3 meters."
CONFIDENCE: verified

SOURCE: https://www.ledtestsystem.com/blogs/emi-emissions-testing-guide/
CLAIM: FCC Part 15 Class B conducted: 66 dBµV QP at 150 kHz, decreasing to 56 dBµV at 500 kHz; 56 dBµV to 5 MHz; 60 dBµV from 5–30 MHz. Average limits ~10 dB lower.
QUOTE: "FCC Part 15 Class B device must stay below 66 dBμV quasi-peak at 150 kHz, decreasing to 56 dBμV at 500 kHz, then holding at 56 dBμV up to 5 MHz, and 60 dBμV from 5 to 30 MHz. Average limits run about 10 dB lower across each band."
CONFIDENCE: verified

SOURCE: https://learnemc.com/emc-regulations-and-standards
CLAIM: FCC Part 15 regulates only emissions; no FCC requirements exist for product immunity, unlike CISPR standards which cover both.
QUOTE: "FCC Part 15...only regulate electromagnetic emissions. Currently, there are no FCC regulations pertaining to product immunity to electromagnetic fields."
CONFIDENCE: verified

### IMMUNITY TEST LEVELS

SOURCE: https://www.ledphotometer.com/blogs/iec-61000-4-3-radiated-immunity-test-system-for-emc-compliance/
CLAIM: IEC 61000-4-3 radiated immunity levels: Level 1 = 1 V/m; Level 2 = 3 V/m; Level 3 = 10 V/m; Level 4 = 30 V/m.
QUOTE: "Level 1: 1 V/m = 120 dBµV/m; Level 2: 3 V/m = 129.5 dBµV/m; Level 3: 10 V/m = 140 dBµV/m; Level 4: 30 V/m = 149.5 dBµV/m."
CONFIDENCE: verified

SOURCE: https://keystonecompliance.com/iec-61000-4-6/
CLAIM: IEC 61000-4-6 conducted immunity levels: Level 1 = 120 dBµV; Level 2 = 130 dBµV; Level 3 = 140 dBµV (10 V into 50 Ω).
QUOTE: "Level 1 (120 dBµV), Level 2 (130 dBµV), Level 3 (140 dBµV). The maximum injection voltage reaches 140 dBµV (10 V) into 50-ohm systems."
CONFIDENCE: verified

SOURCE: https://keystonecompliance.com/iec-61000-4-6/
CLAIM: IEC 61000-4-6 mandates 80% amplitude modulation at 1 kHz per Clause 6.2 during conducted immunity testing.
QUOTE: "The standard requires mandatory 80% amplitude modulation at 1 kHz for immunity testing per Clause 6.2."
CONFIDENCE: verified

### MEASUREMENT UNCERTAINTY AND MARGIN

SOURCE: https://www.researchgate.net/publication/360827976_Measurement_Uncertainty_Evaluation_for_Validating_RFEMC_Chambers_from_30_MHz_to_1000_MHz
CLAIM: Typical radiated EMC test uncertainty budget: antenna factor tolerance ±2 dB; test site imperfections ±4 dB; receiver pulse amplitude accuracy ±1.5 dB; combined standard uncertainty ~1.876 dB; expanded uncertainty ~3.75 dB.
QUOTE: "The antenna factor can have a tolerance of ± 2 dB, with test site imperfections of ± 4 dB and receiver pulse amplitude accuracy of ±1.5 dB. Combined standard uncertainty of 1.876 dB and expanded uncertainty of 3.75 dB."
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/360827976_Measurement_Uncertainty_Evaluation_for_Validating_RFEMC_Chambers_from_30_MHz_to_1000_MHz
CLAIM: Antenna factor (AF) uncertainty for half-wavelength dipoles: ≥0.3 dB up to 1 GHz; ≥0.5 dB up to 2 GHz; translates to 5–15% E-field measurement deviation.
QUOTE: "The uncertainty of AF evaluations for half wavelength dipole antennas is generally equal to or greater than 0.3 dB up to 1 GHz and greater than 0.5 dB up to 2 GHz, causing 5%-15% deviation."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/evolution-of-margin-demonstrations-in-the-emc-discipline/
CLAIM: A 6 dB EMC safety margin is specified in military standards and CISPR's 80/80 rule to accommodate manufacturing variations; 4–6 dB is considered sufficient for most industrial applications.
QUOTE: "A 6-dB EMC safety margin is specified in military standards and CISPR's 80/80 rule to allow for variations in manufacturing. Typically, a margin of 4 to 6 dB is considered sufficient for most industrial applications."
CONFIDENCE: verified

SOURCE: https://ez.analog.com/ez-blogs/b/engineerzone-spotlight/posts/margins-matter-leaving-room-for-error-in-emc-design
CLAIM: 6 dB margin does not cover measurement equipment errors or environmental interactions; some studies suggest 12 dB margin may be necessary in practice.
QUOTE: "The 6 dB margin doesn't cover measurement equipment errors, errors that result from the interactions of EMI with the surroundings. Consequently, an EMC safety margin much higher than 6 dB may be required, with some studies suggesting 12 dB may be necessary."
CONFIDENCE: verified

SOURCE: https://gmelectro.com/blog/2026-guide-to-radiated-vs.-conducted-emissions-testing-for-engineers
CLAIM: Minimum acceptable design margin for radiated tests is 3 dB bare minimum; 4–6 dB provides realistic buffer for component tolerances and test uncertainty.
QUOTE: "A rule of thumb suggests at least 3 dB of margin in radiated tests is a bare minimum, while 4–6 dB gives a more realistic buffer for component tolerances, installation variability, and test uncertainty."
CONFIDENCE: verified

SOURCE: https://www.ledtestsystem.com/blogs/emc-compliance-regulations/
CLAIM: EMC scan plot: Y-axis in dBµV, X-axis in frequency (log scale); limit line is the regulatory limit; margin is distance below limit; designers aim for 3–6 dB margin.
QUOTE: "The vertical units are displayed in dBμV (decibels microvolts). Margin represents how far below the limit your measured emissions are: designers generally aim for a safety margin of at least 3 to 6 dB below the limit."
CONFIDENCE: verified

SOURCE: https://www.researchgate.net/publication/360827976_Measurement_Uncertainty_Evaluation_for_Validating_RFEMC_Chambers_from_30_MHz_to_1000_MHz
CLAIM: Systematic errors as large as 1.95 dB from 30–200 MHz are missing from the NSA method in CISPR 16-1-4:2019.
QUOTE: "Systematic errors as large as 1.95 dB from 30 MHz to 200 MHz are missing from the normalized site attenuation (NSA) method in CISPR 16-1-4:2019."
CONFIDENCE: verified

### FERRITE AND FILTER FIX MAGNITUDES

SOURCE: https://www.emcdorexs.com/ferrite-beads-vs-emi-filters-key-differences-explained.html
CLAIM: Ferrite beads achieve 20–40 dB attenuation in the 100–500 MHz range; improper use (LC resonance below crossover) can cause +10 dB peaking instead.
QUOTE: "Ferrite beads achieve their strongest attenuation from approximately 10 MHz up to several hundred MHz, achieving 20–40 dB attenuation in the 100–500 MHz range. Ferrite beads carry a risk of resonant peaking causing 10 dB gain if LC resonance falls below the crossover frequency."
CONFIDENCE: verified

SOURCE: https://www.emcdorexs.com/ferrite-beads-vs-emi-filters-key-differences-explained.html
CLAIM: Ferrite bead effective impedance at 100 MHz drops from 100 Ω to 10 Ω at 50% rated DC current — a 20 dB reduction in impedance that significantly reduces attenuation.
QUOTE: "The effective impedance at 100 MHz can dramatically drop from 100 Ω to 10 Ω for certain ferrite beads by applying just 50% of the rated current."
CONFIDENCE: verified

SOURCE: https://www.emcdorexs.com/ferrite-beads-vs-emi-filters-key-differences-explained.html
CLAIM: Manufacturers specify ferrite bead impedance only at 100 MHz; devices with identical 100 MHz impedance can have drastically different frequency curves.
QUOTE: "While manufacturers typically specify ferrite bead impedance only at 100 MHz, devices with identical impedance at 100 MHz can have drastically different impedance curves at other frequencies."
CONFIDENCE: verified

### GROUND PLANE AND SITE EFFECTS

SOURCE: https://incompliancemag.com/radiated-emission-measurements-in-the-semi-anechoic-chamber-at-3-5-and-10-m-distance-results-and-empirical-estimates/
CLAIM: Semi-anechoic chamber floors are bare metal to preserve ground-plane reflection; deformations >5 cm at 3 m antenna distance degrade measurement repeatability.
QUOTE: "In semi-anechoic chambers, the metallic floor is left bare to preserve the ground-plane reflection. The ground plane should not have deformations exceeding 5 cm at a 3 m antenna separation distance."
CONFIDENCE: verified

SOURCE: https://incompliancemag.com/radiated-emission-measurements-in-the-semi-anechoic-chamber-at-3-5-and-10-m-distance-results-and-empirical-estimates/
CLAIM: OATS ground plane provides frequency-uniform reflected energy; fully anechoic chamber absorbers cause frequency-dependent absorption that is harder to compensate.
QUOTE: "With a reflective ground plane, the reflected energy at all frequencies of interest is much more uniform and therefore easier to predict compared to absorber floors where the amount of absorption will be slightly different for each emission."
CONFIDENCE: verified

---

## UNRESOLVED GAPS

- No verified primary source for exact biconical antenna factor values at 30 MHz, 100 MHz, 200 MHz (range 8.5–21.5 dB/m across 30–300 MHz is from unverified product page).
- No verified primary source for exact RG-58 loss at 30 MHz (data at 144 MHz is confirmed; 30 MHz loss would be lower due to f^0.5 dependence but exact value not found).
- No CISPR primary standard text verifying exact preselector attenuation figure (>60 dB cited from secondary source).
- Quantified delta between pre-compliance and accredited lab results not found in primary sources.
- CISPR 32 exact numerical limit tables vs CISPR 22 not directly compared (both paywalled; secondary sources say "largely unchanged").
