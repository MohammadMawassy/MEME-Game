function Item(id, name, cap1, cap2) {
    this.id = id;
    this.name = name;
    this.cap1 = cap1;
    this.cap2 = cap2;
  }
  
  function Caption(id, text) {
    this.id = id;
    this.text = text;
  }
  
  export { Item, Caption }