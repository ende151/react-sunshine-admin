import { addClass, hasClass, removeClass } from '@/utils/dom';

export type CustomColorType = {
  name: string;
  light: string;
  dark: string;
};

export async function updateRootTheme(mode: string | null = 'light') {
  const htmlRoot = document.getElementById('htmlRoot');
  if (!htmlRoot) {
    return;
  }
  const hasDarkClass = hasClass(htmlRoot, 'dark');
  if (mode === 'dark') {
    htmlRoot.setAttribute('data-theme', 'dark');
    if (!hasDarkClass) {
      addClass(htmlRoot, 'dark');
    }
  } else {
    htmlRoot.setAttribute('data-theme', 'light');
    if (hasDarkClass) {
      removeClass(htmlRoot, 'dark');
    }
  }
}
