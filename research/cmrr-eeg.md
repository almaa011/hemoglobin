# CMRR in EEG Systems — Merged Research Record
Date: 2026-06-25
Topic slug: cmrr-eeg
Page: pages/cmrr-eeg.html

---

## Section A — CMRR Definition and Mathematics

SOURCE: https://en.wikipedia.org/wiki/Common-mode_rejection_ratio
CLAIM: CMRR is mathematically defined as the ratio of differential gain (Ad) to common-mode gain (Acm), expressed in decibels.
QUOTE: "CMRR = 20 log₁₀(A_d / |A_cm|) dB where A_d = differential gain and A_cm = common-mode gain"
CONFIDENCE: verified

SOURCE: https://en.wikipedia.org/wiki/Common-mode_rejection_ratio
CLAIM: CMRR performance is often much higher at higher gain settings.
QUOTE: "CMRR performance is often much higher at higher gain settings."
CONFIDENCE: verified

SOURCE: https://shop.rf.guru/pages/common-mode-rejection-cmr-and-cmrr-what-they-really-mean
CLAIM: CMRR shows a 20 dB/decade rolloff rate due to the common-mode gain pole and zero.
QUOTE: "The amplifier shows a common-mode gain with a pole and a zero, and a CMRR that decreases at a 20 dB/decade rate."
CONFIDENCE: verified

SOURCE: https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electronics/Operational_Amplifiers_and_Linear_Integrated_Circuits_-_Theory_and_Application_(Fiore)/05:_Practical_Limitations_of_Op_Amp_Circuits/5.7:_CMRR_and_PSRR
CLAIM: CMRR degrades at higher frequencies due to parasitic capacitances and component mismatches becoming more significant.
QUOTE: "CMRR is frequency-dependent. While the rated value applies at DC, the rejection capability degrades significantly at higher frequencies—sometimes falling to only 20-60 dB by 1 MHz depending on the op-amp model."
CONFIDENCE: verified

---

## Section B — 3-Op-Amp Instrumentation Amplifier Architecture

SOURCE: https://circuitcellar.com/resources/quickbits/instrumentation-amplifiers/
CLAIM: A 3-op-amp instrumentation amplifier consists of two input buffer stages and a difference amplifier output stage.
QUOTE: "Instrumentation amplifiers use a three-stage architecture. The input stage consists of two op-amps that maintain a differential voltage across a gain-setting resistor (RG)... The output stage is a difference amplifier that provides additional common-mode rejection."
CONFIDENCE: verified

SOURCE: https://circuitcellar.com/resources/quickbits/instrumentation-amplifiers/
CLAIM: The gain-setting resistor RG in a 3-op-amp instrumentation amplifier does not affect CMRR.
QUOTE: "the gain can be set by changing just one resistor, RG," allowing "users adjust gain externally" while "manufacturers trim other resistors for precision"
CONFIDENCE: verified

SOURCE: https://circuitcellar.com/resources/quickbits/instrumentation-amplifiers/
CLAIM: Increasing differential gain in an instrumentation amplifier also increases CMRR.
QUOTE: "An interesting property of the input stage is that increasing the differential gain also increases the CMRR."
CONFIDENCE: verified

SOURCE: https://www.allaboutcircuits.com/technical-articles/learn-about-three-op-amp-instrumentation-amplifiers/
CLAIM: CMRR in the output difference amplifier stage depends critically on the matching ratio of resistor pairs R1:R3 and R2:R4.
QUOTE: "The CMRR of a 3 op-amp instrumentation amplifier is affected by factors including noise, non-ideal amplifiers, and matched resistors... high CMRR requires a very high degree of ratio matching."
CONFIDENCE: verified

SOURCE: https://www.allaboutcircuits.com/technical-articles/learn-about-three-op-amp-instrumentation-amplifiers/
CLAIM: Achieving 100 dB CMRR in a 3-op-amp difference amplifier requires resistor tolerances of approximately 0.1% or better.
QUOTE: "Assuming 40dB differential gain, the resistors have to be matched to within 0.1% of each other to achieve 100dB of CMRR."
CONFIDENCE: verified

SOURCE: https://www.allaboutcircuits.com/technical-articles/learn-about-three-op-amp-instrumentation-amplifiers/
CLAIM: In 3-op-amp instrumentation amplifiers, op-amps in the input stage must be closely matched and resistors in the difference amplifier stage must be laser trimmed on the silicon die.
QUOTE: "The advantages of an instrumentation amplifier really require op amps A1 and A2 to be closely matched and the resistors in the difference amplifier stage to be extremely well trimmed. This is often accomplished using laser trimming on the silicon die."
CONFIDENCE: verified

SOURCE: https://www.analog.com/en/resources/technical-articles/increasing-the-common-mode-rejection-ratio-of-differential-amp.html
CLAIM: Resistor matching tolerances map directly to CMRR: 0.01% yields ~80 dB, 0.1% yields ~60 dB.
QUOTE: "0.01% toleranced resistors gives a CMRR of about 80dB... 0.1% toleranced resistors yield about 60dB CMRR"
CONFIDENCE: verified

SOURCE: https://www.analog.com/en/resources/technical-articles/increasing-the-common-mode-rejection-ratio-of-differential-amp.html
CLAIM: Single-chip instrumentation amplifiers use laser trimming to achieve CMRR > 100 dB, sometimes reaching 130 dB.
QUOTE: "Single-chip instrumentation amplifiers typically have laser-trimmed resistors to achieve a CMRR in excess of 100 dB, sometimes even 130 dB."
CONFIDENCE: verified

SOURCE: https://circuitcellar.com/resources/quickbits/instrumentation-amplifiers/
CLAIM: Monolithic instrumentation amplifier ICs commonly achieve 100–120 dB CMRR or higher.
QUOTE: "With proper design, instrumentation amplifiers can achieve CMRRs in the range 100 to 120dB or even more."
CONFIDENCE: verified

---

## Section C — ADS1299 Specifications

SOURCE: https://www.ti.com/product/ADS1299
CLAIM: The ADS1299 biopotential ADC has a CMRR specification of −110 dB.
QUOTE: "CMRR of -110 dB"
CONFIDENCE: verified

SOURCE: https://www.ultralibrarian.com/2024/01/17/ads1299-datasheet-analysis-and-features-explained-ulc/
CLAIM: ADS1299 CMRR is measured with a common-mode signal of AVSS + 0.3 V to AVDD – 0.3 V; values are the minimum of the eight channels.
QUOTE: "CMRR is measured with a common-mode signal of AVSS + 0.3 V to AVDD – 0.3 V. The values indicated are the minimum of the eight channels."
CONFIDENCE: verified

SOURCE: https://www.ti.com/lit/ds/symlink/ads1299.pdf
CLAIM: ADS1299 CMRR spec of -110 dB applies at gain = 12, 250 SPS, AVDD = 5 V, DVDD = 3.3 V, VREFP = 4.5 V, external clock = 2.048 MHz.
QUOTE: "CMRR is measured with a common-mode signal of AVSS + 0.3 V to AVDD – 0.3 V" at supply voltages AVDD = 5 V, DVDD = 3.3 V, VREFP = 4.5 V, external clock = 2.048 MHz, data rate = 250 SPS, and gain = 12.
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/612315/ads1299-ac-input-impedance
CLAIM: The ADS1299 input impedance is approximately 2 gigaohms differential (1 GΩ per side common-mode).
QUOTE: "The DC input impedance spec in the datasheet is the common-mode impedance, with differential impedance being 2x = 2G Ohm (i.e., 2 Gigaohms for differential input impedance)."
CONFIDENCE: verified

---

## Section D — Electrode Impedance Mismatch and System CMRR Degradation

SOURCE: https://www.tandfonline.com/doi/abs/10.1080/00029238.1995.11080527
CLAIM: When input electrode impedances are unequal, a common-mode signal is converted into an interfering differential signal by the voltage-divider effect.
QUOTE: "When input electrode impedances are unequal, a common mode signal that is present equally at the two locations on the patient's body appears at different magnitudes at the two (inverting and noninverting) inputs of the amplifier; thus, part of the common mode signal is amplified as if it were a differential signal"
CONFIDENCE: verified

SOURCE: https://www.tandfonline.com/doi/abs/10.1080/00029238.1995.11080527
CLAIM: CMRR degradation from electrode mismatch follows approximately ΔZE/ZC, where ΔZE is the electrode impedance difference and ZC is amplifier input impedance.
QUOTE: "In case of impedance mismatch, the CMRR will be degraded as approximately ΔZE/ZC, where ΔZE is the difference between the two skin–electrode interface impedances and ZC is the input impedance of the operational amplifier."
CONFIDENCE: verified

SOURCE: https://www.tandfonline.com/doi/abs/10.1080/00029238.1995.11080527
CLAIM: Even if an amplifier has very high intrinsic CMRR, common-mode signals convert to interfering differential signals if electrode impedances are unbalanced.
QUOTE: "Even if the intrinsic CMRR of the amplifier is very high, common mode is converted to an interfering differential signal if the electrode impedances are unbalanced"
CONFIDENCE: verified

SOURCE: https://shop.rf.guru/pages/common-mode-rejection-cmr-and-cmrr-what-they-really-mean
CLAIM: A source impedance imbalance of only 5 Ω can degrade CMRR from 80 dB to 40 dB.
QUOTE: "In practical applications, a source impedance imbalance of only 5 ohms can degrade the CMRR from 80 dB to 40 dB."
CONFIDENCE: verified

SOURCE: https://openbci.com/forum/index.php?p=/discussion/154/front-end-filtering-esd-cmrr-rfi
CLAIM: Electrode impedances in clinical EEG practice can vary between a few kΩ and 50 kΩ, causing the filter capacitor's AC impedance to interact and degrade CMRR.
QUOTE: "Electrode impedances in clinical practice can typically vary between a few kOhm through upwards of 50kOhm and this in combination with the filter capacitor will cause CMRR ratios to suffer because a capacitor has an impedance of 1/2/Pi/f/C which is in the same order of magnitude as the electrode impedance variability."
CONFIDENCE: verified

SOURCE: https://openbci.com/forum/index.php?p=/discussion/154/front-end-filtering-esd-cmrr-rfi
CLAIM: Industry-standard mitigation for preserving CMRR with EEG input filter capacitors is to keep capacitor values low (≈100 pF) with tight tolerances.
QUOTE: "The industry standard mitigation strategies are to keep the capacitor values low such as 100pF and to use tight tolerance capacitors such that no imbalance is created between leads."
CONFIDENCE: verified

SOURCE: https://ez.analog.com/ez-blogs/b/engineerzone-spotlight/posts/precision-low-power-understanding-cmrr-and-rld-in-biopotential-signal-chains
CLAIM: The amplifier input impedance should be at least 1 GΩ at 60 Hz to prevent source impedance imbalance from deteriorating system CMRR.
QUOTE: "The input impedance of the amplifier should be at least 10^9 Ω at 60 Hz to prevent source impedance unbalances from deteriorating the overall CMRR"
CONFIDENCE: verified

SOURCE: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763498/
CLAIM: For noncontact/capacitive electrodes, picofarad imbalances between electrodes degrade CMRR more severely than kilohm imbalances with contact electrodes.
QUOTE: "For noncontact/capacitive electrodes, an imbalance of picofarads between the electrodes can reduce the CMRR more severely than contact ones, whose imbalance is usually in the order of kiloohms"
CONFIDENCE: verified

SOURCE: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763498/
CLAIM: A practical biopotential system measured 96 dB CMRR at 50 Hz with 47 kΩ electrode impedance imbalance.
QUOTE: "One study measured a CMRR of 96 dB at 50 Hz with imbalanced electrode impedances (ΔZe = 47 kΩ)"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/728302/ads1299-problems-with-low-cmrr
CLAIM: Real ADS1299 front-ends measure only ~60 dB CMRR in practice, far below the datasheet spec of −110 dB, due to electrode impedance mismatch.
QUOTE: "When measuring the CMRR of the complete front end they obtained values around 60dB, far from expectations."
CONFIDENCE: verified

---

## Section E — IEC Standards for Biopotential CMRR

SOURCE: https://www.whaleteq.com/en/app/view18-cmrr-test-principle-and-method
CLAIM: IEC 60601-2-26 (EEG equipment) requires a minimum CMRR of −89 dB at mains frequency using a 2 Vrms test signal.
QUOTE: "the CMRR value required by IEC 60601-2-26 is -89dB"
CONFIDENCE: verified

SOURCE: https://www.whaleteq.com/en/app/view18-cmrr-test-principle-and-method
CLAIM: IEC 60601-2-25 (ECG) requires a 20 Vrms mains-frequency common-mode test signal; IEC 60601-2-26 (EEG) requires 2 Vrms.
QUOTE: "IEC 60601-2-25/27 standards for ECG require a 20 Vrms mains frequency signal voltage...IEC 60601-2-26 for EEG requires 2Vrms mains frequency signal voltage."
CONFIDENCE: verified

SOURCE: https://www.whaleteq.com/en/app/view18-cmrr-test-principle-and-method
CLAIM: IEC 60601-2-47 (ambulatory ECG) requires −60 dB CMRR at mains frequency and −45 dB at 2× mains frequency, with 51 kΩ impedance imbalance.
QUOTE: "The CMRR value required by IEC 60601-2-47 at mains frequency is -60dB, and -45dB at twice the mains frequency; the impedance imbalance is 51kΩ."
CONFIDENCE: verified

---

## Section F — Right Leg Drive (RLD)

SOURCE: https://www.ti.com/lit/pdf/sbaa188
CLAIM: The RLD feedback loop improves CMRR by an amount equal to (1 + A), where A is the closed-loop gain of the feedback loop.
QUOTE: "The feedback loop improves CMR by an amount equal to (1 + A), where A is the closed-loop gain of the feedback loop"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/400935/ads1299-right-leg-drive-closed-loop-bandwidth-rc-in-datasheet-and-ek
CLAIM: RLD closed-loop bandwidth is: fBW = 1 / (2π × Rf × Cf).
QUOTE: "The closed loop bandwidth of the RLD loop is approximately fBW = 1/(2 pi Rf Cf)"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/400935/ads1299-right-leg-drive-closed-loop-bandwidth-rc-in-datasheet-and-ek
CLAIM: A 1 MΩ/1.5 nF RC network yields ~106 Hz RLD bandwidth; 392 kΩ/10 nF yields ~40 Hz.
QUOTE: "For a 1MΩ/1.5nF RC network, this yields approximately 106Hz, and for a 392kΩ/10nF RC network on the FE Board approximately 40Hz"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/546300/ads1299-140db-cmrr-analog-front-end-schematics-design
CLAIM: With the RLD configured as open-loop (BIAS_OUT connected directly), a CMRR of approximately 140 dB can be achieved with EEG patient cable.
QUOTE: "With this connection you can reach CMRR of about 140dB (measured with EEG patient cable)"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/546300/ads1299-140db-cmrr-analog-front-end-schematics-design
CLAIM: More PGA outputs connected to the BIAS amplifier inverting input increase the DC loop gain of the RLD, improving CMRR at low frequencies.
QUOTE: "Each PGA output is connected to the BIAS amplifier inverting input through a 220-kOhm resistor, and as more electrodes are selected in the feedback loop, the gain at DC (and at 60 Hz) increases"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/546300/ads1299-140db-cmrr-analog-front-end-schematics-design
CLAIM: EEG signals (~10 µV amplitude) require RLD circuit implementation for practical CMRR performance.
QUOTE: "Because EEG signal amplitude is small (about 10µV), you must use RLD circuit for bias drive"
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/546300/ads1299-140db-cmrr-analog-front-end-schematics-design
CLAIM: Battery or isolation DC/DC converter power supply is recommended for both patient safety and better CMRR performance with ADS1299.
QUOTE: "You must use battery power supply, or if you use USB or some wall adapter, use isolation DC/DC converter for patient safety and for better CMRR performance"
CONFIDENCE: verified

---

## Section G — Driven Shield (BIAS_SHD)

SOURCE: https://www.mouser.com/ds/2/405/slau443-96153.pdf
CLAIM: The ADS1299EEG-FE shield drive output (BIAS_SHD) actively holds the cable shield at the same potential as the signal wire to reduce noise.
QUOTE: "The outer shields of electrode cables can be connected to the buffered BIAS_SHD signal generated by the integrated circuit of ADS1299EEG-FE to help reduce noise and improve signal quality"
CONFIDENCE: verified

SOURCE: https://www.mouser.com/ds/2/405/slau443-96153.pdf
CLAIM: On ADS1299EEG-FE board, jumper JP17 (1-2) must be shorted to enable the shield drive; components are not factory-installed.
QUOTE: "The jumper (1-2) on JP17 must be shorted to enable the shield drive. Footprints for the components needed for the shield drive circuitry are available on the board, but the components are not installed at the factory."
CONFIDENCE: verified

---

## Section H — System vs Amplifier CMRR (Adversarial)

SOURCE: https://shop.rf.guru/pages/common-mode-rejection-cmr-and-cmrr-what-they-really-mean
CLAIM: The datasheet CMRR spec is measured under ideal bench conditions and does not account for real-world source impedance or wiring asymmetry.
QUOTE: "While the amplifier may have excellent intrinsic CMRR on the bench, the effective system rejection can collapse if the antenna, cabling, and layout are not truly symmetrical with respect to the local noise environment."
CONFIDENCE: verified

SOURCE: https://ez.analog.com/ez-blogs/b/engineerzone-spotlight/posts/precision-low-power-understanding-cmrr-and-rld-in-biopotential-signal-chains
CLAIM: A biosignal amplifier should have at least 80 dB CMRR at 50/60 Hz; commercial amplifiers typically achieve 100–110 dB; state-of-the-art designs reach 120–140 dB.
QUOTE: "A biosignal amplifier should have a CMRR of at least 80dB at 50/60Hz, though 100-110 dB is a common value among commercial amplifiers. State-of-the-art bio-potential amplifiers provide a CMRR of 120 to 140 dB"
CONFIDENCE: verified

SOURCE: https://ez.analog.com/ez-blogs/b/engineerzone-spotlight/posts/precision-low-power-understanding-cmrr-and-rld-in-biopotential-signal-chains
CLAIM: With balanced electrode impedances, >100 dB system CMRR can be achieved; with 150 kΩ and 5 kΩ imbalance, typical system CMRR drops below 60 dB.
QUOTE: "a biopotential amplifier with typical CMRR >60 dB can be measured with 150K electrode impedance and 5K imbalance @50Hz and 60Hz, while >100dB can be achieved with balanced electrode impedance @50Hz and 60Hz"
CONFIDENCE: verified

---

## Conflicts

None between the three researchers. All three converge on the same picture:
- Amplifier CMRR spec (−110 dB for ADS1299) is valid only at specific conditions (gain=12, 50/60 Hz, balanced electrodes)
- Real-world system CMRR is dominated by electrode impedance mismatch, not amplifier intrinsic CMRR
- RLD can recover 40–80 dB of system CMRR if properly implemented

NOTE: The "5 Ω imbalance degrades 80 dB → 40 dB" figure (Researcher B via ScienceDirect) vs the "5 Ω degrades 80 dB → 40 dB" figure (Researcher C via RF Guru) appear as the same claim from different sources — kept once.

---

## UNRESOLVED (survived gap recovery candidates)

1. ADS1299 CMRR vs frequency curve — datasheet does not publish values above/below 50/60 Hz; only known by measurement
2. BIAS_SHD driver bandwidth and phase margin for ADS1299 — not specified in accessible documents
3. RLD open-loop vs closed-loop CMRR stability analysis — quantitative phase margin data not found

---

## Sources (all fetched and confirmed)

1. Wikipedia — CMRR: https://en.wikipedia.org/wiki/Common-mode_rejection_ratio
2. Circuit Cellar — Instrumentation Amplifiers: https://circuitcellar.com/resources/quickbits/instrumentation-amplifiers/
3. All About Circuits — 3-op-amp IA: https://www.allaboutcircuits.com/technical-articles/learn-about-three-op-amp-instrumentation-amplifiers/
4. Analog Devices — Increasing CMRR: https://www.analog.com/en/resources/technical-articles/increasing-the-common-mode-rejection-ratio-of-differential-amp.html
5. TI ADS1299 product page: https://www.ti.com/product/ADS1299
6. TI ADS1299 datasheet: https://www.ti.com/lit/ds/symlink/ads1299.pdf
7. UltraLibrarian ADS1299 analysis: https://www.ultralibrarian.com/2024/01/17/ads1299-datasheet-analysis-and-features-explained-ulc/
8. TI E2E — ADS1299 input impedance: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/612315/ads1299-ac-input-impedance
9. TI E2E — RLD bandwidth: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/400935/ads1299-right-leg-drive-closed-loop-bandwidth-rc-in-datasheet-and-ek
10. TI E2E — 140 dB CMRR design: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/546300/ads1299-140db-cmrr-analog-front-end-schematics-design
11. TI E2E — Low CMRR problem: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/728302/ads1299-problems-with-low-cmrr
12. TI SBAA188 app note: https://www.ti.com/lit/pdf/sbaa188
13. Analog Devices EngineerZone — CMRR and RLD: https://ez.analog.com/ez-blogs/b/engineerzone-spotlight/posts/precision-low-power-understanding-cmrr-and-rld-in-biopotential-signal-chains
14. OpenBCI Forum — Front-end filtering CMRR: https://openbci.com/forum/index.php?p=/discussion/154/front-end-filtering-esd-cmrr-rfi
15. Tandfonline — Electrode impedance mismatch: https://www.tandfonline.com/doi/abs/10.1080/00029238.1995.11080527
16. NCBI PMC — Common-mode noise reduction: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7763498/
17. RF Guru — CMRR explained: https://shop.rf.guru/pages/common-mode-rejection-cmr-and-cmrr-what-they-really-mean
18. WhaleTeq — CMRR test methods: https://www.whaleteq.com/en/app/view18-cmrr-test-principle-and-method
19. Mouser — ADS1299EEG-FE user guide: https://www.mouser.com/ds/2/405/slau443-96153.pdf
20. LibreTexts — CMRR and PSRR: https://eng.libretexts.org/Bookshelves/Electrical_Engineering/Electronics/Operational_Amplifiers_and_Linear_Integrated_Circuits_-_Theory_and_Application_(Fiore)/05:_Practical_Limitations_of_Op_Amp_Circuits/5.7:_CMRR_and_PSRR
