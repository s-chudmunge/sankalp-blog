---
title: "Majorana zero Edge States with longer-range interactions in a quantum Ising chain"
date: 2026-01-09T07:54:55Z
draft: false
---

I worked with the Transverse Field Ising Model (TFIM) in a 1D quantum Ising chain during my master's thesis to see how it behaves when pushed toward its topological limits. Mapping this model to a Kitaev chain produces Majorana Zero Modes (MZMs), which are zero-energy edge states that act as their own antiparticles. These states are topologically protected, meaning they are robust against local noise or small perturbations because they only depend on the global state of the system. This resistance to decoherence makes them a candidate for storing quantum information.

In this project, I used a Variational Quantum Eigensolver (VQE) to hunt for these ground states. VQE is essentially a numerical optimizer that searches the Hilbert space to find the configuration with the lowest energy. It’s an "honest" way to map out the topological phase boundaries, showing exactly where the energy gap closes and reopens as the system transitions between phases.

The most interesting part of the research was adding longer-range interactions to the chain. In a simple nearest-neighbor model, the physics is well-understood. But as you allow spins to talk to each other across greater distances, the phase diagram expands and becomes more complex. You start to see new topological transitions that wouldn't exist otherwise.

This project wasn't about chasing the most complex Hamiltonian possible; it was about building a minimal, intuitive implementation to see how these global properties emerge from simple, local interactions.

You can read the full master's thesis and explore the implementation in the links below. Feel free to reach out if you have any thoughts or questions about the physics or the code.

- **Thesis Report:** [Download from Google Drive](https://drive.google.com/file/d/166C3ATUUm-UkmL1ergTeTpF3TbaG8bGA/view?pli=1)
- **GitHub Repository:** [majorana-tfim-vqet](https://github.com/s-chudmunge/majorana-tfim-vqet)
