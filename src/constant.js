export const normalize = (
    value,
    currentScaleMin,
    currentScaleMax,
    newScaleMin = 0,
    newScaleMax = 1,
) => {
    const standardNormalization = (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

    return (
        (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
    );
}