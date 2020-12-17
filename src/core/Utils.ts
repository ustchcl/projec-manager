export class KeyData {
  constructor(
    public key: string,
    public ctrlPress: boolean = false,
    public altPress: boolean = false) { }
}

class Utils {

  public SaveToLocal(content: string, fileName: string) {
    const blob = new Blob([content])
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  }

  /**
   * Check if a click is done outside an element, and execute a callback if so.
   * @param {HTMLElement} element Element to check if the click is outside of.
   * @param {Function} callback Function to call when the click is outside the element.
   */
  public ClickOutside(element: HTMLElement, callback: (event: any) => void) {
    let firstTime = true;
    const onclick = (event: any) => {
      if (firstTime) {
        firstTime = false;
        return;
      }
      if (!element.contains(event.target)) {
        callback(event);
        window.removeEventListener("click", onclick);
      }
    };
    window.addEventListener("click", onclick);
  }

  /**
   * Same as @function ClickOutside but also listen to a key press.
   * @param {HTMLElement} element Element to check if the click is outside of.
   * @param {Function} callback Function to call when the click is outside the element.
   * @param {KeyData} keyData Key to listen to.
   */
  ClickOutsideOrKeyPress(element: HTMLElement, callback: (event: any, type: string) => void, keyData: any) {
    let firstTime = true;
    const events = {
      onclick(event: any) {
        if (firstTime) {
          firstTime = false;
          return;
        }
        if (!element.contains(event.target)) {
          callback(event, "click");
          window.removeEventListener("click", events.onclick);
          window.removeEventListener("keyup", events.keyup);
        }
      },
      keyup(event: any) {
        if (event.key === keyData.key) {
          callback(event, "keyup");
          window.removeEventListener("click", events.onclick);
          window.removeEventListener("keyup", events.keyup);
        }
      }
    };

    window.addEventListener("click", events.onclick);
    window.addEventListener("keyup", events.keyup);
  }

  /**
   * Helper function to focus on the textfield.
   * @param {HTMLElement} textField Textfield to focus on.
   */
  FocusTextField(textField: HTMLElement) {
    setTimeout(() => {
      textField.getElementsByTagName('input')[0].focus();
    }, 100);
  }
}

export default new Utils();
