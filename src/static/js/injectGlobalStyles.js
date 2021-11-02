export const injectGlobalStyles = (cssResult) => {
  const globalStyle = document.createElement('style');
  globalStyle.innerHTML = cssResult.toString()
  document.head.appendChild(globalStyle);
}
