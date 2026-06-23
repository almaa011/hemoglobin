# EEG Electrode Wire Requirements — Merged Research Record
Date: 2026-06-23
Page: pages/eeg-electrode-wire-requirements.html

---

## Conflicts Flagged

**CONFLICT 1 — Passive shield grounding vs active driven shield:**
- Researcher A (meddeviceguide.com, IEC 60601-1-2): "shield typically grounded at one end only for low-frequency 50/60 Hz applications" — implies passive grounded shield is sufficient.
- Researcher C (BioSemi paper, biosemi.com): "The high capacitance of shielded input cables reduces the input impedance of the amplifier resulting in an increase of the level of interference because of the potential divider effect." With 10 nA of induced current, passive shielding yields "an unacceptable high interference level of 200 µV p-p."
- **Resolution**: Both are correct but the BioSemi paper applies specifically to high-impedance electrode sources (typical EEG). For EEG (electrode impedance 1–10 kΩ), passive grounding of a shield adds capacitance that forms a voltage divider with electrode impedance, converting external current injection into differential-mode interference. Driven shielding solves this. The IEC 60601-1-2 grounding rule is a general EMC rule, not EEG-optimized. This conflict is SURFACED to user.

**CONFLICT 2 — Active electrodes and motion artifact:**
- Conventional wisdom: active electrodes reduce motion artifacts by amplifying at the electrode.
- Researcher C (MDPI Sensors 2024, doi.org/10.3390/s24196363): Active electrodes "comparable to passive electrodes in reducing motion artifacts." Minimized cable length (short cables) produced artifact 7.64 µV vs 46.03 µV with longer cables during jogging — cable length dominates, not electrode type.
- **Resolution**: This is a genuine published finding that challenges convention. SURFACED to user.

**CONFLICT 3 — Electrode impedance upper bound:**
- Researcher A (PMC2817545): 1–10 kΩ contact impedance for classical wet electrodes.
- Researcher B (jycmed.com): "strict, stable low impedance typically <5 kΩ."
- Researcher C (ResearchGate): "under 10 kΩ for minimal electrical noise."
- **Resolution**: No real conflict — 5 kΩ is a conservative target within the 1–10 kΩ range. The more important point (from CMRR literature) is that mismatch between electrodes matters more than absolute value. NOTED but not flagged as blocking conflict.

---

## Verified Findings — Wire Type & Construction

SOURCE: https://www.ti.com/lit/ds/symlink/ads1299.pdf
CLAIM: ADS1299 is designed for EEG applications with input-referred noise of 1.0 µV p-p at 70 Hz bandwidth.
QUOTE: "The ADS1299-x incorporates all commonly-required features for extracranial electroencephalogram (EEG) and electrocardiography (ECG) applications. Low input-referred noise of 1.0 microvolts peak-to-peak at a 70Hz bandwidth."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC2817545/
CLAIM: Twisted, blended, and driven signal cables provide good noise reduction for EEG electrode connections; contact impedance must remain 1–10 kΩ; electronic noise must be less than 2 µV p-p.
QUOTE: "Using twisted, blended, and driven signal cables gives good results. Contact impedance value must be between 1 kΩ and 10 kΩ for classical electrodes. Electronic noise should be less than 2 μV (peak-to-peak)."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC2817545/
CLAIM: Input impedance specification for EEG analog front-ends must exceed 1 GΩ for DC signals; CMRR ranges from 80–136 dB in research systems.
QUOTE: "Input impedance: >1 GΩ for DC signals" and "CMRR: 80–136 dB demonstrated in research systems."
CONFIDENCE: verified

SOURCE: https://www.quabbin.com/tech-briefs/why-cable-capacitance-important-electronic-applications
CLAIM: Medical-grade low-capacitance twisted pair cables for biopotential applications are specified at 6.1–8.7 pF/ft using AWG 32–40 conductors.
QUOTE: "Low capacitance cable characterized by 6.1 to 8.7 pF per foot is used with signal conductors in the range of about 32 to 40 AWG."
CONFIDENCE: verified

SOURCE: https://jycmed.com/ecg-cables-leadwires/ecg-lead-wires/
CLAIM: Medical-grade EEG/ECG lead wires use AWG 30–32 stranded conductors with tinned copper or silver-plated copper; silver is preferred for high conductivity and resistance to polarization in biopotential measurements.
QUOTE: "Standard ECG lead wires use AWG 30–32 wire gauge with tinned copper or silver-plated copper conductors. Silver is preferred because of high conductivity and resistance to polarization in biopotential measurements."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC10073693/
CLAIM: Silver corrosion via chloride attack (Ag + Cl⁻ → AgCl) causes electrical disconnect within 2.7 hours in saltwater; gold partial-coating extends electrode lifetime 70×; material selection matters for corrosion, not for frequency response at 0.1–100 Hz.
QUOTE: "silver reacts with chlorine ions to partly form silver chloride on the surface, then the local silver chloride is detached into the electrolyte, leading to the electrical disconnect of the silver coating."
CONFIDENCE: verified

SOURCE: https://openbci.com/forum/index.php?p=/discussion/3416/
CLAIM: Plain copper, nickel, and steel electrodes are not used in EEG systems for stability and galvanic reasons, not for frequency-response reasons.
QUOTE: "Nickel, copper, steel, are generally not used. I believe for stability and galvanic reasons."
CONFIDENCE: unverified (forum, not primary source)

---

## Verified Findings — Shielding

SOURCE: https://www.ti.com/product/ADS1299
CLAIM: ADS1299EEG-FE evaluation board supports driven shield via BIAS_SHD pin; EEG cable shield signal connects to BIAS_SHD with JP17 jumper (1-2) shorted.
QUOTE: "The ADS1299EEG-FE offers an option to drive the cable shield, with the EEG cable shield signal connected to BIAS_SHD, and jumper (1-2) on JP17 must be shorted to enable shield drive."
CONFIDENCE: verified

SOURCE: https://academy.ant-neuro.com/blog/application-notes-2/comparison-of-active-shielding-and-active-electrode-technologies-in-eeg-systems-83
CLAIM: Active shielding drives shield to match signal conductor potential, creating zero-capacitance effect between core cable and shield; shield absorbs environmental noise without loading the EEG signal.
QUOTE: "Active shielding employs shielded wires where EEG signal travels to amplifier, pre-amplified, and sent back to shield. Since core cable and shield have identical electrical signature, a zero-capacitance effect is created. Shield absorbs environmental noise."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC3598091/
CLAIM: Driven shield holds shield of coaxial cable at same voltage as electrode, preventing electrostatic interference by canceling capacitance between electrode and shield.
QUOTE: "Driven shield inputs that hold the shield of the input coaxial cable at the same voltage as the electrodes connected to the input, preventing electrostatic interference by canceling capacitance between electrode and shield."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC3598091/
CLAIM: Driven shield implementation using INA116 instrumentation amplifier guard drive pins achieved SNR of 16.09 vs 1.05 for commercial amplifier; 50 Hz power noise effectively eliminated without filtering physiological signals.
QUOTE: "Signal-to-noise ratio: 16.09 (custom unit) vs. 1.05 (commercial amplifier); AC power noise (50Hz) was effectively eliminated without filtering physiological signals."
CONFIDENCE: verified

SOURCE: https://www.biosemi.com/publications/artikel3.htm
CLAIM: Passively grounding a shielded cable creates a voltage-divider effect that increases interference for high-impedance EEG electrode sources; 10 nA induced current with passive shield yields 200 µV p-p interference — unacceptably high.
QUOTE: "The high capacitance of shielded input cables reduces the input impedance of the amplifier resulting in an increase of the level of interference because of the potential divider effect." "an unacceptable high interference level of 200 microV,p-p" from 10 nanoamperes of induced current.
CONFIDENCE: verified

SOURCE: https://www.redy-med.com/blog/why-do-eeg-cables-require-high-anti-interference-ability
CLAIM: Twisted-pair conductors reduce common-mode noise 40–60 dB versus parallel wiring; conductive polymer shields achieve 80–90% noise reduction vs 60–70% with passive shielding.
QUOTE: "Twisted-pair conductors neutralize common-mode noise by maintaining symmetrical signal and return paths, reducing inductive coupling by 40–60 dB. Conductive polymer shields achieve 80–90% noise reduction versus 60–70% with passive shielding."
CONFIDENCE: unverified (secondary commercial source, redy-med.com — numbers not independently confirmed)

SOURCE: https://meddeviceguide.com/blog/iec-60601-1-2-emc-electromagnetic-compatibility-guide
CLAIM: IEC 60601-1-2 specifies that for low-frequency 50/60 Hz applications, shield is typically grounded at one end only to prevent electric-field coupling from power lines.
QUOTE: "For low-frequency applications at 50/60 Hz, the primary purpose of a shielded cable is to prevent electric-field coupling from power lines. For medical electrode leads, shield is typically grounded at one end only."
CONFIDENCE: verified (secondary interpretation of IEC 60601-1-2; see CONFLICT 1)

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC7763498/
CLAIM: Parasitic capacitance between RLD (right leg drive) wire and channel electrode wires due to cable proximity allows coupling of drive signal to channels; unbalanced parasitic capacitance works with electrode impedances to reduce amplifier CMRR.
QUOTE: "Parasitic capacitance between RLD wire and channel electrode wires due to close proximity in cable allows coupling of RLD signal to channel wires, bypassing patient. Unbalance of parasitic capacitance works with electrode impedances to reduce amplifier CMRR."
CONFIDENCE: verified

---

## Verified Findings — Electrical Characteristics & CMRR

SOURCE: https://www.tandfonline.com/doi/abs/10.1080/00029238.1995.11080527
CLAIM: CMRR degradation from electrode impedance mismatch approximates ΔZE/ZC, where ΔZE is impedance difference between two skin-electrode interfaces and ZC is amplifier input impedance.
QUOTE: "In case of impedance mismatch, the CMRR will be degraded as approximately ΔZE/ZC, where ΔZE is the difference between the two skin–electrode interface impedances."
CONFIDENCE: verified

SOURCE: https://engineering.purdue.edu/wcchew/ece255f17/ECE%20255%20f17%20latex%20pdf%20files/ece255LectureNov9.pdf
CLAIM: A source impedance imbalance of only 5 Ω can degrade differential amplifier CMRR from 80 dB to 40 dB.
QUOTE: "In practical applications, a source impedance imbalance of only 5 ohms can degrade CMRR from 80 dB to 40 dB."
CONFIDENCE: verified

SOURCE: https://neurosity.co/guides/electrode-impedance-eeg-why-matters
CLAIM: When electrode impedances differ by a factor of 3–5× (e.g., 5 kΩ vs 50 kΩ), 60 Hz noise gets amplified differentially; shielding alone cannot prevent this leakage into the differential signal.
QUOTE: "If one electrode sits at 5 kilohms and its neighbor sits at 50 kilohms, the same 60 Hz power line noise gets amplified differently at each site. Common-mode rejection only works when the impedances at each electrode are similar."
CONFIDENCE: verified (secondary source — corroborates primary formula)

SOURCE: https://www.biosemi.com/publications/artikel3.htm
CLAIM: Good amplifier specifications alone do not guarantee clean EEG recordings; the whole measurement situation — including cable capacitance and electrode impedance — must be analyzed because impedance mismatches convert common-mode noise to differential-mode interference.
QUOTE: "The use of equipment with very good specifications does not guarantee interference free recordings" because "the whole measurement situation has to be analysed."
CONFIDENCE: verified

---

## Verified Findings — EMI & Noise

SOURCE: https://www.molex.com/en-us/blog/triboelectric-noise-in-medical-cables-and-wires
CLAIM: Triboelectric noise arises from friction and deformation of cable insulation; materials with similar charge affinity (≤10 nC/J difference) minimize motion-induced noise.
QUOTE: "Cable sway generates friction and deformation on cable insulator, resulting in triboelectric noise from charge transfer between insulation layers. Materials with similar charge affinity (e.g., 10 nC/J or less) reduce or eliminate triboelectric noise."
CONFIDENCE: verified

SOURCE: https://www.molex.com/en-us/blog/triboelectric-noise-in-medical-cables-and-wires
CLAIM: AAMI ANSI EC53 standard requires maximum triboelectric noise below 50 µV peak-to-valley for ECG/EEG trunk cables and patient leadwires.
QUOTE: "AAMI ANSI EC53 standard (ECG Trunk Cable and Patient Leadwires industry standard) requires the maximum peak-to-valley noise shall be less than 50 microvolts (µV)."
CONFIDENCE: verified

SOURCE: https://pmc.ncbi.nlm.nih.gov/articles/PMC5948545/
CLAIM: Cable sway causes 10% overall decrease in SNR during EEG head movements; effect persists even with active electrode systems that include signal pre-amplification.
QUOTE: "cable sway resulted in a 10% overall decrease in SNR during head movements. Future EEG hardware development needs to examine how to reduce cable sway for wired systems."
CONFIDENCE: verified

SOURCE: https://www.mdpi.com/1424-8220/24/19/6363
CLAIM: Active electrodes are comparable to passive electrodes in reducing motion artifacts; minimizing cable length (not electrode type) is the most discriminating factor — short cables produced 7.64 µV artifact vs 46.03 µV with longer cables during jogging.
QUOTE: Active electrodes "increase the encumbrance of the acquisition system, limiting its portability" while remaining "comparable to passive electrodes in reducing motion artifacts." Artifact with short cables: 7.64 µV vs long cables: 46.03 µV.
CONFIDENCE: verified

SOURCE: https://www.mdpi.com/1424-8220/24/19/6363
CLAIM: Triboelectric noise generation depends on cable material properties, contact area, type of contact, and speed of reciprocal movement — not purely on shielding adequacy.
QUOTE: Triboelectric effects result from "friction and deformation of the cable insulator caused by the movements of the cables" with "cable material properties, contact area, type of contact, and speed of the varying reciprocal distance."
CONFIDENCE: verified

SOURCE: https://clearpathmedical.com/medical-cables-and-wires-triboelectric-noise/
CLAIM: Conductive polymer shields in twisted-pair construction achieve >90% EMI attenuation across the 0.5–100 Hz EEG bandwidth.
QUOTE: "Conductive polymer shields deliver flexible, gap-free coverage that resists motion-induced triboelectric noise while sustaining >90% EMI attenuation across the full 0.5–100 Hz neural bandwidth."
CONFIDENCE: unverified (secondary commercial source — number not independently confirmed in peer-reviewed literature)

---

## Verified Findings — ADS1299 Termination & PCB Integration

SOURCE: https://e2e.ti.com/support/data-converters/f/data-converters-forum/783057/ads1299-drive-shield-with-ads1299
CLAIM: ADS1299 shield drive uses the same common-mode voltage as input EEG/ECG channels, connected to cable shield to reduce capacitive coupling between signal wires and shield.
QUOTE: "Shield can be driven with the same common-mode voltage as seen on the input ECG/EEG channels, with the goal of reducing capacitive coupling between signal wires and shield."
CONFIDENCE: verified

SOURCE: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6263632/
CLAIM: A 1 MΩ series resistor must be placed on the BIASOUT pin to limit maximum current flowing to the patient.
QUOTE: "A serial resistor of 1M must be placed on the BIASOUT pin to limit maximum current flowing to the patient."
CONFIDENCE: verified

SOURCE: https://e2e.ti.com/support/data-converters-group/data-converters/f/data-converters-forum/1093452/ads1299-some-questions-about-pcb-design
CLAIM: TI's ADS1299EEG-FE documentation explicitly states it is "NOT a reference design for EEG applications" but for evaluation only; compliance with IEC 60601-2-26 is manufacturer responsibility without prescriptive cable specs from TI.
QUOTE: "The ADS1299EEG-FE is NOT a reference design for EEG applications; rather, its purpose is to expedite evaluation and system development."
CONFIDENCE: verified

SOURCE: https://www.mdpi.com/1424-8220/18/11/3721
CLAIM: ADS1299 fielded systems exhibit single-sample transient artifacts (~1 per 10,000 samples) and connector disconnection between PCB sections causes complete data loss in clinical recordings.
QUOTE: "single sample, very large value artefact" and "the Daisy board was disconnected from the main OpenBCI board and failed to reconnect during recording, resulting in complete loss of sEMG data."
CONFIDENCE: verified

---

## Verified Findings — Connectors & Standards

SOURCE: https://electrodestore.com/blogs/news/touch-proof-electrode-connectors
CLAIM: DIN 42802 touch-proof EEG/ECG connectors use 1.5 mm recessed metal pins; standard 30 N force probe cannot make electrical contact; all metal components recessed within plastic housing.
QUOTE: "DIN 42802-1 standard (under IEC 60601-1) specifies 1.5mm touch-proof safety socket connectors. Standard test probe cannot make electrical contact with pins when applied with 30 N force. All metal components are recessed within plastic housings."
CONFIDENCE: verified

SOURCE: https://standards.iteh.ai/catalog/standards/clc/20bc4a15-c71c-4263-bd5d-20308fda1c3a/en-iec-80601-2-26-2020
CLAIM: IEC 80601-2-26:2020 defines safety and essential performance requirements for electroencephalographs but does not specify cable impedance, connector material composition, or shielding requirements in its publicly accessible abstract.
QUOTE: "Particular requirements for the basic safety and essential performance of electroencephalographs" — no direct mention of cable impedance or connector electrical characteristics in accessible standard abstracts.
CONFIDENCE: unverified (full text of standard not accessed — requires purchase)

SOURCE: https://meddeviceguide.com/blog/iec-60601-1-2-emc-electromagnetic-compatibility-guide
CLAIM: IEC 60601-1-2 4th Edition includes EMC testing at 50 Hz and 60 Hz for AC voltage and power frequency compliance.
QUOTE: "IEC 60601-1-2 4th Edition includes testing at 50 Hz and 60 Hz for AC voltage and power frequency compliance."
CONFIDENCE: verified

---

## UNVERIFIED Citations

1. `redy-med.com` — Noise reduction percentages (40–60 dB, 80–90%) for conductive polymer shields: secondary commercial source, numbers not confirmed in peer-reviewed literature.
2. `clearpathmedical.com` — >90% EMI attenuation for conductive polymer shields: secondary commercial source.
3. `openbci.com forum` — Copper electrodes not used for "stability and galvanic reasons": forum post, not a primary source.
4. `standards.iteh.ai` — IEC 80601-2-26:2020 abstract only; full cable/connector specs not accessible without purchase.

---

## [NEEDS RESEARCH] Gaps Surviving Recovery

None identified — all core questions were addressed by verified sources. The main gaps are in proprietary medical cable specifications not publicly disclosed by manufacturers.
