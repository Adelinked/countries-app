export const getSize = (obj: any) => {
  let bytes = 0;

  return (function getObjectSize(obj) {
    if (obj !== null && obj !== undefined) {
      var objClass = Object.prototype.toString.call(obj).slice(8, -1);

      if (objClass === "Object" || objClass === "Array") {
        for (var key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          getObjectSize(obj[key]);
        }
      } else {
        bytes += obj.toString().length * 2;
      }
    }

    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
    else return (bytes / 1073741824).toFixed(3) + " GB";
  })(obj);
};
