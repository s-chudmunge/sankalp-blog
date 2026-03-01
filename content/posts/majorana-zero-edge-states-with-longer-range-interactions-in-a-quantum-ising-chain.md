---
title: "Majorana zero Edge States with longer-range interactions in a quantum Ising chain"
date: 2026-01-09T07:54:55Z
draft: false
---

I’ve always been fascinated by the idea of global protection arising from local rules. In my master's thesis, I spent a lot of time looking at a 1D quantum Ising chain, specifically the Transverse Field Ising Model (TFIM), to see how it behaves when you push it toward its topological limits.

When you transform the TFIM into a Kitaev chain, something remarkable happens: Majorana Zero Modes (MZMs) emerge. These aren't just particles; they are zero-energy edge states that act as their own antiparticles. What makes them special is their topological protection—they don't care about local noise or small perturbations. They only care about the "global" state of the system. This makes them a holy grail for quantum computing, as they offer a way to store information that is naturally resistant to decoherence.

In this project, I used a Variational Quantum Eigensolver (VQE) to hunt for these ground states. VQE is essentially a numerical optimizer that searches the Hilbert space to find the configuration with the lowest energy. It’s an "honest" way to map out the topological phase boundaries, showing exactly where the energy gap closes and reopens as the system transitions between phases.

The most interesting part of the research was adding longer-range interactions to the chain. In a simple nearest-neighbor model, the physics is well-understood. But as you allow spins to talk to each other across greater distances, the phase diagram expands and becomes more complex. You start to see new topological transitions that wouldn't exist otherwise.

This project wasn't about chasing the most complex Hamiltonian possible; it was about building a minimal, intuitive implementation to see how these global properties emerge from simple, local interactions.

You can read the full master's thesis and explore the implementation in the links below. Feel free to reach out if you have any thoughts or questions about the physics or the code.

- **Thesis Report:** [Download from Google Drive](https://drive.google.com/file/d/166C3ATUUm-UkmL1ergTeTpF3TbaG8bGA/view?pli=1)
- **GitHub Repository:** [majorana-tfim-vqet](https://github.com/s-chudmunge/majorana-tfim-vqet)
