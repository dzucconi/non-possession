export default xs =>
  xs.join(', ').replace(/,\s([^,]+)$/, ', and $1');
