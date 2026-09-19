
const PRODUCTS = [
{id:"AD-101",name:"Hybrid Tomatoes",category:"Vegetables",crop:"TOM",price:28,mandi:16,retail:42,farmer:"Ramesh FPO",location:"Kolar, Karnataka",qty:1200,grade:"Grade A+",fresh:"Harvested 6 hours ago",type:"both"},
{id:"AD-102",name:"Red Onions",category:"Vegetables",crop:"ONI",price:24,mandi:14,retail:38,farmer:"Sahyadri Farmers FPO",location:"Nashik, Maharashtra",qty:3500,grade:"Export Grade",fresh:"Cured yesterday",type:"both"},
{id:"AD-103",name:"1121 Basmati Rice",category:"Grains",crop:"RIC",price:78,mandi:54,retail:110,farmer:"Krishna Valley Agro",location:"Karnal, Haryana",qty:5000,grade:"Aged 12 Months",fresh:"Fresh milling batch",type:"b2b"},
{id:"AD-104",name:"Alphonso Mangoes",category:"Fruits",crop:"MAN",price:140,mandi:85,retail:220,farmer:"Devgad Mango Producers",location:"Ratnagiri, Maharashtra",qty:800,grade:"GI Certified",fresh:"Tree ripened",type:"both"},
{id:"AD-105",name:"Kufri Potatoes",category:"Vegetables",crop:"POT",price:22,mandi:12,retail:34,farmer:"Braj Bhoomi FPO",location:"Agra, Uttar Pradesh",qty:4200,grade:"Size 45mm+",fresh:"Cold room stored",type:"both"},
{id:"AD-106",name:"Royal Delicious Apples",category:"Fruits",crop:"APP",price:110,mandi:72,retail:175,farmer:"Kinnaur Mountain Orchard",location:"Shimla, Himachal Pradesh",qty:1500,grade:"Premium Grade",fresh:"Fresh orchard pluck",type:"both"},
{id:"AD-107",name:"Turmeric Finger",category:"Spices",crop:"TUR",price:96,mandi:71,retail:135,farmer:"Warangal Spice FPO",location:"Warangal, Telangana",qty:2100,grade:"High Curcumin",fresh:"Cured and dried",type:"b2b"},
{id:"AD-108",name:"Sweet Corn",category:"Vegetables",crop:"COR",price:32,mandi:20,retail:48,farmer:"Sangamner Kisan Collective",location:"Ahmednagar, Maharashtra",qty:900,grade:"Grade A",fresh:"Harvested today",type:"both"}
];
const SEED_ORDERS=[
{id:"ORD-24081",buyer:"FreshMart Hyderabad",farmer:"Ramesh FPO",product:"Hybrid Tomatoes",qty:"500 kg",total:14000,status:"In transit",code:"transit",date:"18 Sep 2026",escrow:"Protected"},
{id:"ORD-24080",buyer:"CityBasket",farmer:"Sahyadri Farmers FPO",product:"Red Onions",qty:"800 kg",total:19200,status:"Delivered",code:"delivered",date:"17 Sep 2026",escrow:"Released"},
{id:"ORD-24079",buyer:"Metro Foods",farmer:"Krishna Valley Agro",product:"1121 Basmati Rice",qty:"1,000 kg",total:78000,status:"Pending pickup",code:"pending",date:"17 Sep 2026",escrow:"Protected"},
{id:"ORD-24078",buyer:"Urban Harvest",farmer:"Devgad Mango Producers",product:"Alphonso Mangoes",qty:"250 kg",total:35000,status:"Delivered",code:"delivered",date:"16 Sep 2026",escrow:"Released"},
{id:"ORD-24077",buyer:"FreshMart Hyderabad",farmer:"Braj Bhoomi FPO",product:"Kufri Potatoes",qty:"700 kg",total:15400,status:"In transit",code:"transit",date:"16 Sep 2026",escrow:"Protected"}
];
const $=id=>document.getElementById(id);
const money=n=>"₹"+Number(n||0).toLocaleString("en-IN");
function storeGet(key,fallback){try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}}
function storeSet(key,value){localStorage.setItem(key,JSON.stringify(value))}
function getProducts(){return storeGet("ad_products",PRODUCTS)}
function getOrders(){return storeGet("ad_orders",SEED_ORDERS)}
function getCart(){return storeGet("ad_cart",[])}
function setActiveNav(){const path=location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(a=>{const href=a.getAttribute("href").split("/").pop();a.classList.toggle("active",href===path)})}
function showToast(message){const t=$("toast");if(!t)return;t.textContent=message;t.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove("show"),2800)}
function openModal(id){$(id)?.classList.add("open")}
function closeModal(id){$(id)?.classList.remove("open")}
function toggleSidebar(){ $("sidebar")?.classList.toggle("open"); $("mobileOverlay")?.classList.toggle("open")}
function updateCartCount(){const c=getCart();document.querySelectorAll(".cart-count").forEach(x=>x.textContent=c.reduce((s,i)=>s+i.qty,0))}
function addToCart(id,qty=1){const p=getProducts().find(x=>x.id===id);if(!p)return;const cart=getCart();const item=cart.find(x=>x.id===id);if(item)item.qty=Math.min(item.qty+Number(qty),p.qty);else cart.push({...p,qty:Number(qty)});storeSet("ad_cart",cart);updateCartCount();showToast(`${p.name} added to cart`)}
function removeFromCart(id){storeSet("ad_cart",getCart().filter(x=>x.id!==id));updateCartCount();renderCart?.()}
function checkoutCart(){const cart=getCart();if(!cart.length){showToast("Your cart is empty");return}const orders=getOrders();const total=cart.reduce((s,x)=>s+x.price*x.qty,0);orders.unshift({id:"ORD-"+Math.floor(25000+Math.random()*999),buyer:"Direct Buyer",farmer:cart[0].farmer,product:cart.map(x=>x.name).join(", "),qty:cart.reduce((s,x)=>s+x.qty,0)+" kg",total,status:"Pending pickup",code:"pending",date:new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}),escrow:"Protected"});storeSet("ad_orders",orders);storeSet("ad_cart",[]);updateCartCount();renderCart?.();closeModal("cartModal");showToast("Order created and escrow protected")}
function renderCart(){const box=$("cartItems");if(!box)return;const c=getCart();if(!c.length){box.innerHTML='<div class="empty"><strong>Your cart is empty</strong><span>Add produce from the marketplace to continue.</span></div>';if($("cartTotal"))$("cartTotal").textContent=money(0);return}box.innerHTML=c.map(x=>`<div class="price-row"><div><strong class="product-name">${x.name}</strong><div class="sub">${x.farmer} · ${x.qty} kg</div></div><strong class="price">${money(x.price*x.qty)}</strong><button class="btn btn-danger" onclick="removeFromCart('${x.id}')">Remove</button></div>`).join("");if($("cartTotal"))$("cartTotal").textContent=money(c.reduce((s,x)=>s+x.price*x.qty,0))}
function openCart(){renderCart();openModal("cartModal")}
function speak(text,lang="en-IN"){if(!("speechSynthesis"in window)){showToast("Voice playback is not supported in this browser");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=.92;speechSynthesis.speak(u)}
function dailyRates(){speak("Today's direct farm gate rates: tomatoes twenty eight rupees per kilogram, onions twenty four, potatoes twenty two, and basmati rice seventy eight.","en-IN")}
function toggleAssistant(){openModal("assistantModal")}
function sendAssistant(e){e.preventDefault();const input=$("assistantInput"),box=$("assistantMessages");if(!input||!box)return;const q=input.value.trim();if(!q)return;box.insertAdjacentHTML("beforeend",`<div class="muted-box" style="margin-top:8px"><strong>You</strong><div class="sub">${escapeHtml(q)}</div></div>`);let a="I can help with marketplace prices, farmer onboarding, orders, escrow, AI demand forecasts and logistics.";if(/price|rate|mandi/i.test(q))a="Current sample direct rates are ₹28/kg tomatoes, ₹24/kg onions, ₹22/kg potatoes and ₹78/kg Basmati rice.";if(/order|escrow/i.test(q))a="Orders are recorded locally in this demo and checkout creates a protected escrow status.";if(/farmer|fpo/i.test(q))a="Use Farmers & FPOs to onboard producers, verify documents and publish harvest lots.";box.insertAdjacentHTML("beforeend",`<div class="notice" style="margin-top:8px"><div><strong>AgriDirect Assistant</strong><p>${a}</p></div></div>`);input.value=""}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function createHarvest(e){e.preventDefault();const fd=new FormData(e.target);const p={id:"AD-"+Math.floor(200+Math.random()*800),name:fd.get("name"),category:fd.get("category"),crop:String(fd.get("name")).slice(0,3).toUpperCase(),price:Number(fd.get("price")),mandi:Math.max(1,Number(fd.get("price"))-8),retail:Number(fd.get("price"))+14,farmer:fd.get("farmer"),location:fd.get("location"),qty:Number(fd.get("qty")),grade:fd.get("grade"),fresh:"Newly listed",type:"both"};const ps=getProducts();ps.unshift(p);storeSet("ad_products",ps);closeModal("harvestModal");e.target.reset();showToast("Harvest lot published successfully");window.renderMarketplace?.()}
function registerFarmer(e){e.preventDefault();closeModal("farmerModal");e.target.reset();showToast("Farmer/FPO onboarding request submitted")}
function setGlobalLanguage(v){showToast(v==="hi"?"Hindi voice assistance selected":"English assistance selected")}
document.addEventListener("DOMContentLoaded",()=>{setActiveNav();updateCartCount();document.querySelectorAll(".modal-backdrop").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}))});
