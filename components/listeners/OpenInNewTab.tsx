const openInNewTab = (url: string) => {
    const win = window.open(url, '_blank');
    win?.focus();
  };

export default openInNewTab;