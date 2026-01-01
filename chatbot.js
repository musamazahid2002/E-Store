/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

// AI Chatbot for Watch Store
class WatchChatbot {
  constructor() {
    this.isOpen = false;
    this.chatHistory = [];
    this.init();
  }

  init() {
    this.createChatUI();
    this.attachEventListeners();
  }

  createChatUI() {
    const chatbotHTML = `
      <div id="chatbot-container" class="chatbot-container">
        <div id="chatbot-window" class="chatbot-window" style="display: none;">
          <div class="chatbot-header">
            <h5 class="mb-0"><strong>Watch Store Assistant</strong></h5>
            <button id="chatbot-close" class="chatbot-close">&times;</button>
          </div>
          <div id="chatbot-messages" class="chatbot-messages"></div>
          <div class="chatbot-input-container">
            <button id="chatbot-emoji-btn" class="chatbot-emoji-btn" title="Add Emoji">😊</button>
            <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Ask about watches, prices, orders...">
            <button id="chatbot-send" class="chatbot-send">
              <i class="tf-ion-paper-airplane"></i>
            </button>
          </div>
          <div id="chatbot-emoji-picker" class="chatbot-emoji-picker" style="display: none;"></div>
        </div>
        <button id="chatbot-toggle" class="chatbot-toggle">
          <i class="tf-ion-chatbubbles"></i>
        </button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    const welcomeMsg = {
      type: 'bot',
      text: "👋 Hello! I'm your Watch Store Assistant. 😊 I can help you with:\n• Watch prices and features 💰\n• Product quality information ⭐\n• Order and checkout details 🛒\n• Reviews and feedback ⭐\n• Order history 📋\n\nHow can I assist you today? 😊"
    };
    this.addMessage(welcomeMsg);
  }

  attachEventListeners() {
    document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChat());
    document.getElementById('chatbot-close').addEventListener('click', () => this.toggleChat());
    document.getElementById('chatbot-send').addEventListener('click', () => this.handleSend());
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
    
    // Emoji button
    const emojiBtn = document.getElementById('chatbot-emoji-btn');
    const emojiPicker = document.getElementById('chatbot-emoji-picker');
    if (emojiBtn) {
      emojiBtn.addEventListener('click', () => this.toggleEmojiPicker());
    }
    
    // Close emoji picker when clicking outside
    document.addEventListener('click', (e) => {
      if (emojiPicker && !emojiPicker.contains(e.target) && e.target !== emojiBtn) {
        emojiPicker.style.display = 'none';
      }
    });
  }

  toggleEmojiPicker() {
    const emojiPicker = document.getElementById('chatbot-emoji-picker');
    if (emojiPicker.style.display === 'none') {
      this.showEmojiPicker();
    } else {
      emojiPicker.style.display = 'none';
    }
  }

  showEmojiPicker() {
    const emojiPicker = document.getElementById('chatbot-emoji-picker');
    const commonEmojis = ['😊', '😃', '😄', '😁', '😆', '😂', '😉', '😍', '🥰', '🙂', '🤗', '🤩', '🤔', '🙄', '😏', '😌', '😛', '😜', '😝', '😒', '😔', '🙃', '😲', '😞', '😤', '😢', '😭', '😨', '🤯', '😰', '😱', '😳', '🤪', '😡', '😠', '😷', '😇', '🥳', '🤓', '😎', '👋', '👍', '👎', '👌', '✌️', '🤞', '👏', '🙌', '🤝', '🙏', '💪', '💰', '💵', '💳', '💎', '🔧', '⚡', '🔥', '💧', '⭐', '🌟', '✨', '⌚', '📱', '📞', '⏰', '🔋', '💡', '🛒', '🛍️', '📦', '📧', '📝', '✅', '❌', '❓', '❗', '💯', '🎯', '🚀', '🎉', '🏆', '📊', '📈', '📉', '🔒', '🔓', '🛡️', '⚙️', '📍', '📅', '⏳'];
    
    emojiPicker.innerHTML = '';
    const emojiGrid = document.createElement('div');
    emojiGrid.className = 'emoji-grid';
    emojiGrid.style.cssText = 'display: grid; grid-template-columns: repeat(8, 1fr); gap: 5px; padding: 10px; max-height: 200px; overflow-y: auto;';
    
    commonEmojis.forEach(emoji => {
      const emojiBtn = document.createElement('button');
      emojiBtn.textContent = emoji;
      emojiBtn.className = 'emoji-item';
      emojiBtn.style.cssText = 'background: none; border: none; font-size: 24px; cursor: pointer; padding: 5px; border-radius: 5px; transition: background 0.2s;';
      emojiBtn.addEventListener('mouseenter', function() {
        this.style.background = '#f0f0f0';
      });
      emojiBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
      });
      emojiBtn.addEventListener('click', () => {
        const input = document.getElementById('chatbot-input');
        input.value += emoji;
        input.focus();
        emojiPicker.style.display = 'none';
      });
      emojiGrid.appendChild(emojiBtn);
    });
    
    emojiPicker.appendChild(emojiGrid);
    emojiPicker.style.display = 'block';
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const body = document.body;
    
    if (this.isOpen) {
      window.style.display = 'block';
      // Prevent body scroll when chatbot is open
      body.style.overflow = 'hidden';
      // Focus input after a short delay to ensure window is visible
      setTimeout(() => {
        document.getElementById('chatbot-input').focus();
        // Scroll messages to bottom
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'auto'
        });
      }, 100);
    } else {
      window.style.display = 'none';
      body.style.overflow = '';
    }
  }

  handleSend() {
    const input = document.getElementById('chatbot-input');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;

    // Clear previous messages (except welcome message)
    this.clearPreviousMessages();

    // Add user message
    this.addMessage({ type: 'user', text: userMessage });
    input.value = '';
    input.focus();

    // Get bot response
    setTimeout(() => {
      const response = this.getResponse(userMessage);
      this.addMessage({ type: 'bot', text: response });
      // Ensure scroll after response is added
      setTimeout(() => {
        const messagesContainer = document.getElementById('chatbot-messages');
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }, 500);
  }

  clearPreviousMessages() {
    const messagesContainer = document.getElementById('chatbot-messages');
    // Keep only the welcome message (first message)
    const messages = messagesContainer.querySelectorAll('.chatbot-message');
    if (messages.length > 1) {
      // Remove all messages except the first one (welcome message)
      for (let i = messages.length - 1; i > 0; i--) {
        messages[i].remove();
      }
    }
    // Clear chat history except welcome message
    if (this.chatHistory.length > 1) {
      this.chatHistory = [this.chatHistory[0]];
    }
  }

  addMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message chatbot-message-${message.type}`;
    messageDiv.innerHTML = `<div class="chatbot-message-content">${this.formatMessage(message.text)}</div>`;
    messagesContainer.appendChild(messageDiv);
    
    // Force scroll to bottom to show new message properly
    requestAnimationFrame(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      // Also use smooth scroll for better UX
      setTimeout(() => {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 50);
    });
    
    this.chatHistory.push(message);
  }

  formatMessage(text) {
    // Convert newlines to <br> and format lists
    return text.replace(/\n/g, '<br>').replace(/•/g, '&bull;');
  }

  getResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Price queries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return this.getPriceResponse();
    }

    // Quality queries
    if (message.includes('quality') || message.includes('durable') || message.includes('material') || message.includes('build')) {
      return this.getQualityResponse();
    }

    // Order and checkout queries
    if (message.includes('order') || message.includes('checkout') || message.includes('purchase') || message.includes('buy')) {
      return this.getOrderResponse(message);
    }

    // Review queries
    if (message.includes('review') || message.includes('rating') || message.includes('feedback') || message.includes('testimonial')) {
      return this.getReviewResponse();
    }

    // Order history queries
    if (message.includes('history') || message.includes('my order') || message.includes('previous order') || message.includes('past order') || message.includes('order list')) {
      return this.getOrderHistoryResponse();
    }

    // Cart queries
    if (message.includes('cart') || message.includes('basket') || message.includes('items in cart')) {
      return this.getCartResponse();
    }

    // Warranty queries
    if (message.includes('warranty') || message.includes('guarantee') || message.includes('return')) {
      return "🛡️ All our watches come with a <strong>1-year manufacturer warranty</strong> covering:\n• Manufacturing defects ⚠️\n• Material quality issues 🔍\n• Functional problems 🔧\n\nFor returns or warranty claims, please contact our support team with your order details. 📞\n<strong>Helpline: 0302-3988810</strong>";
    }

    // Battery queries
    if (message.includes('battery') || message.includes('charge') || message.includes('power')) {
      return "🔋 Our watches feature:\n• <strong>Extended battery life:</strong> Up to 5-7 days on a single charge ⚡\n• <strong>Fast charging:</strong> Quick charge capability ⚡\n• <strong>Power saving modes:</strong> Optimize battery usage 💡\n• <strong>Wireless charging:</strong> Available on select models 🔌\n\nThe exact battery life depends on usage patterns and features enabled. 😊";
    }

    // Product features
    if (message.includes('feature') || message.includes('specification') || message.includes('spec') || message.includes('what can')) {
      return this.getFeatureResponse();
    }

    // Shipping queries
    if (message.includes('shipping') || message.includes('delivery') || message.includes('ship')) {
      return "🚚 Our shipping cost is PKR 1,400. We offer standard delivery within 5-7 business days. 📦\n\nFor express delivery options, please contact our support team. 📞\n<strong>Helpline: 0302-3988810</strong>";
    }

    // Payment queries
    if (message.includes('payment') || message.includes('pay') || message.includes('stripe') || message.includes('cash')) {
      return "💳 We accept two payment methods:\n• Credit/Debit Card (via Stripe) - Secure online payment 🔒\n• Cash on Delivery - Pay when you receive your order 💵\n\nBoth methods are safe and secure! ✅";
    }

    // Product availability
    if (message.includes('available') || message.includes('stock') || message.includes('in stock')) {
      return "✅ All our watch models are currently <strong>in stock</strong> and ready to ship! We have:\n• Apple Watch 🍎\n• Galaxy Watch 🌌\n• Motorola Watch 📱\n• OnePlus Watch ⚡\n• Oppo Watch 📲\n• Realme Watch ⚙️\n• Redmi Watch 🔴\n• Xiaomi Watch 📱\n\nAll models come in multiple colors and sizes. Would you like details on any specific model? 😊";
    }

    // Help queries
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return "😊 I'm here to help! I can assist with:\n\n• <strong>Product Information:</strong> Features, specifications, quality 📱\n• <strong>Pricing:</strong> Current prices and offers 💰\n• <strong>Shopping:</strong> Add to cart, checkout process 🛒\n• <strong>Orders:</strong> Order status, history, tracking 📋\n• <strong>Reviews:</strong> Customer feedback and testimonials ⭐\n• <strong>Support:</strong> Warranty, returns, shipping 🛡️\n\nFor additional support, call our helpline: 📞\n<strong>0302-3988810</strong>\n\nWhat would you like to know?";
    }

    // Default response
    return this.getDefaultResponse();
  }

  getPriceResponse() {
    return "💰 Our smartwatches are priced at <strong>PKR 7,000</strong> (originally PKR 8,400). This includes:\n• Premium build quality ⭐\n• Advanced fitness tracking 🏃\n• Long battery life 🔋\n• Water resistance 💧\n• Smart notifications 📱\n\nAll watches come with a 1-year warranty. Would you like to know about any specific model? 😊";
  }

  getQualityResponse() {
    return "✨ Our watches are built with <strong>premium quality materials</strong>:\n\n• <strong>Durability:</strong> Scratch-resistant displays and water-resistant casings 💎\n• <strong>Materials:</strong> High-grade stainless steel and premium watch bands ⚙️\n• <strong>Testing:</strong> Each watch undergoes rigorous quality testing ✅\n• <strong>Warranty:</strong> 1-year manufacturer warranty included 🛡️\n• <strong>Reliability:</strong> Advanced processors ensure consistent performance 🚀\n\nWe guarantee exceptional quality that stands the test of time! ⏰";
  }

  getOrderResponse(message) {
    if (message.includes('track') || message.includes('status')) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (orders.length === 0) {
        return "📦 You don't have any orders yet. Would you like to browse our products? 😊";
      }
      const latestOrder = orders[orders.length - 1];
      return `📋 Your latest order:\n• <strong>Order ID:</strong> ${latestOrder.orderId} 🆔\n• <strong>Status:</strong> ${latestOrder.status} ${latestOrder.status === 'confirmed' ? '✅' : '⏳'}\n• <strong>Date:</strong> ${new Date(latestOrder.date).toLocaleDateString()} 📅\n• <strong>Total:</strong> PKR ${latestOrder.total.toLocaleString()} 💰`;
    }

    return "🛒 To place an order:\n\n1. <strong>Browse Products:</strong> Visit our products page 👀\n2. <strong>Add to Cart:</strong> Click 'Add to Cart' on any watch ➕\n3. <strong>View Cart:</strong> Click the cart icon in the navbar 🛍️\n4. <strong>Checkout:</strong> Fill in your billing information 📝\n5. <strong>Payment:</strong> Choose Stripe or Cash on Delivery 💳\n6. <strong>Confirm:</strong> Place your order ✅\n\nNeed help with checkout? Just ask! 😊";
  }

  getReviewResponse() {
    return "⭐ Here's what our customers say:\n\n<strong>Ali Akbar (Fitness Trainer):</strong> 💪\n\"The fitness tracking is incredibly accurate, and battery life is outstanding!\" 🔋\n\n<strong>Mitchell John (Tech Reviewer):</strong> 💻\n\"Seamless integration with devices and exceptional build quality.\" ✨\n\n<strong>Sheikh Khalid (Business Executive):</strong> 👔\n\"Perfect combination of style and functionality. Highly recommended!\" 👍\n\nAll our watches have excellent ratings. Would you like to see more reviews? 😊";
  }

  getOrderHistoryResponse() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    if (orders.length === 0) {
      return "📦 You haven't placed any orders yet. Browse our collection and add watches to your cart to get started! 😊";
    }

    let response = `📋 You have <strong>${orders.length}</strong> order(s):\n\n`;
    orders.slice(-5).reverse().forEach((order, index) => {
      response += `${index + 1}. <strong>Order ${order.orderId}</strong> 🆔\n`;
      response += `   • Date: ${new Date(order.date).toLocaleDateString()} 📅\n`;
      response += `   • Total: PKR ${order.total.toLocaleString()} 💰\n`;
      response += `   • Status: ${order.status} ${order.status === 'confirmed' ? '✅' : '⏳'}\n`;
      response += `   • Payment: ${order.paymentMethod === 'stripe' ? '💳 Card' : '💵 Cash on Delivery'}\n\n`;
    });

    return response;
  }

  getFeatureResponse() {
    return "🎯 Our smartwatches include these <strong>amazing features</strong>:\n\n• <strong>Fitness Tracking:</strong> Heart rate, steps, calories, sleep monitoring ❤️\n• <strong>Smart Notifications:</strong> Calls, messages, app alerts 📲\n• <strong>Battery Life:</strong> Extended battery with fast charging 🔋\n• <strong>Water Resistance:</strong> Swim and shower safely 💧\n• <strong>GPS Tracking:</strong> Accurate location tracking 📍\n• <strong>Multiple Colors:</strong> Black, White, Silver, Gold options 🎨\n• <strong>Multiple Sizes:</strong> Small, Medium, Large available 📏\n\nWhich feature interests you most? 😊";
  }

  getCartResponse() {
    const cart = new ShoppingCart();
    const items = cart.cart;
    
    if (items.length === 0) {
      return "🛒 Your cart is currently empty. Browse our products and add watches to your cart to get started! 😊";
    }

    let response = `🛍️ You have <strong>${items.length}</strong> item(s) in your cart:\n\n`;
    items.forEach((item, index) => {
      response += `${index + 1}. <strong>${item.name}</strong> ⌚\n`;
      response += `   • Quantity: ${item.quantity}\n`;
      response += `   • Price: PKR ${item.price.toLocaleString()} each 💰\n`;
      response += `   • Subtotal: PKR ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    const total = cart.getTotal();
    response += `Cart Total: <strong>PKR ${total.toLocaleString()}</strong> 💵\n\n`;
    response += "Would you like to proceed to checkout? ✅";

    return response;
  }

  getDefaultResponse() {
    return "😊 I'm here to help! However, I don't have specific information about that topic. 📞\n\nFor detailed assistance, please contact our helpline:\n<strong>📱 0302-3988810</strong>\n\nOur support team is available to help you with:\n• Product inquiries 📦\n• Order assistance 🛒\n• Technical support 🔧\n• General questions ❓\n\nYou can also ask me about:\n• Watch prices and features 💰\n• Product quality ⭐\n• How to place orders 🛍️\n• Order history 📋\n• Reviews and feedback ⭐\n• Cart contents 🛒";
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  new WatchChatbot();
});

