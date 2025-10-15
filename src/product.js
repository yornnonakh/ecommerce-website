  // Fetch product data
  async function getProducts() {
    const res = await fetch('products.json');
    const data = await res.json();
    return data;
  }
  // Show dynamic modal
  async function showProductModal(productId) {
    const products = await getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingModal = document.querySelector('#product-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.classList.add('fixed', 'inset-0', 'bg-black/50', 'flex', 'items-center', 'justify-center', 'z-50', 'p-4');
    // using modal.innerHTML all the code to this play all class
    modal.innerHTML = `
      <div class="border-1 border-[#9AA6B2] hover:border-[#1E93AB] duration-300 bg-transparent bg-opacity-22 backdrop-filter md:backdrop-blur-lg relative rounded-xl p-2 shadow-2xl max-w-5xl w-full overflow-auto max-h-[90vh] relative">
        <button id="close-modal" class="cursor-pointer absolute top-2 right-4 text-[#1E93AB] hover:text-white text-3xl font-bold">&times;</button>
        <div class="flex flex-col md:flex-row p-6 gap-4">
          <div class="md:flex-1">
            <img src="${product.image}" alt="${product.name}" class="w-full h-100 object-cover rounded-lg mb-4">
            <a href="about.html#submit">
              <div class="flex gap-2">
                <button class="cursor-pointer w-full bg-[#51829B] border-1 border-[#51829B] hover:border-white hover:bg-[#1E93AB] text-white hover:text-white py-2 px-4 rounded-full font-bold transition-colors duration-700">Buy Now</button>
                <button class="cursor-pointer w-full font-bold bg-gray text-[#1E93AB] hover:text-white py-2 px-4 rounded-full hover:bg-[#1E93AB] border-1 border-[#9AA6B2] hover:border-[#51829B] transition-colors duration-700">Contact Us</button>
              </div>
            </a>
          </div>
          <div class="md:flex-1 text-white">
            <h2 class="text-2xl font-bold mb-2 text-[#1E93AB]">${product.name}</h2>
            <p class="text-white font-bold mb-4">${product.description}</p>
            <div class="flex gap-4 mb-4 flex-wrap">
              <div ><span class="font-bold text-[#1E93AB]">Price:</span> $ ${product.price}</div>
              <div ><span class="font-bold text-[#1E93AB]">Availability:</span> ${product.availability}</div>
            </div>
            <div class="mb-4">
              <span class="font-bold text-[#1E93AB]">Colors:</span>
              <div class="flex gap-2 mt-2">
                ${product.colors.map(c => `<button class="cursor-pointer text-white w-6 h-6 rounded-full" style="background-color:${c}"></button>`).join('')}
              </div>
            </div>
            <div class="mb-4">
              <span class="font-bold text-white">Sizes:</span>
              <div class="flex gap-2 mt-2 flex-wrap">
                ${product.sizes.map(s => `<button class="cursor-pointer text-white bg-[#51829B] py-2 px-4 rounded-full font-bold hover:bg-[#1E93AB]">${s}</button>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    // using document.body.appendchild
    document.body.appendChild(modal);
    // document.getElementId => Close modal
    document.getElementById('close-modal').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if(e.target === modal) modal.remove(); });
  }
  // add-to-cart-btn for the class for all button
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      showProductModal(id);
    });
  });  