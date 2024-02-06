# Vepr Architecture & Design Decisions

🚧 This document is far from final state, frequently edited, and may possibly be
outdated.

Vepr is a research project that explores a compact protocol for defining data
visualization for large datasets. Vepr seeks to offload most of data-related
computations out of the main thread, only providing optimized and compact data
structures for rendering. Vepr is build for interactive data visualization that
improve user's feedback loop when exploring a dataset.

## User Experience Considerations

1. Resulting visualization are interactive and change their state over time
2. The visualized image is adaptive to the screen size changes and dark mode
3. High performance by default. Resiliency for low tier hardware or large
   datasets

## Developer Experience Considerations

1. Each layer of the project can be used directly. This means if the top level
   creates constraints for the developer, elements of the lower level can be
   re-composed in the way that prevents the original problem, instead of coming
   up with workarounds or additional layers of code
2. Chart computation phase is separated from the visual image rendering. This
   means heavy data-related computations can be moved to a WebWorker to avoid
   blocking the main thread
3. Zero dependencies. Everything needed for interactive data visualizations
   coming out of the box
4. Sensible defaults supplied. The developer most likely do not own the data.
