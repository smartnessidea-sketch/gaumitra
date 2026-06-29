const STORAGE_KEY = "gaumitra_working_records_v1";

const modules = [
  {id:"gaushala-registration", name:"Gaushala Registration", desc:"Register Gaushala, trust, contact and capacity details.", fields:["Gaushala Name","Trust / Organization Name","Registration Number","Contact Person","Mobile Number","Email","Full Address","City","State","Total Animals","Shed Capacity","Land Area","Message"]},
  {id:"animal-master", name:"Animal Master & Registration", desc:"Unique animal ID, breed, age, gender and source tracking.", fields:["Animal ID","Animal Name","Breed","Gender","Age","Category","Identification Marks","Source","Admission Date","Current Shed","Health Status","Notes"]},
  {id:"health-medical", name:"Health & Medical Management", desc:"Vaccination, treatment, vet visits, prescription and alerts.", fields:["Animal ID","Date","Health Issue","Treatment Given","Medicine","Vaccination","Vet Name","Next Visit Date","Emergency Level","Notes"]},
  {id:"breeding-calf", name:"Breeding & Calf Management", desc:"Breeding records, pregnancy tracking, delivery and calf lifecycle.", fields:["Animal ID","Breeding Date","Bull / Semen Detail","Pregnancy Status","Expected Delivery","Delivery Date","Calf ID","Calf Gender","Complication","Notes"]},
  {id:"feeding-milk", name:"Feeding & Milk Management", desc:"Feeding schedules, diet plans, milk production and sale usage.", fields:["Animal ID","Date","Feed Type","Feed Quantity","Diet Plan","Milk Produced","Milk Used","Milk Sold","Responsible Staff","Notes"]},
  {id:"inventory-shed", name:"Inventory & Shed Operations", desc:"Fodder, equipment, stock, shed allocation and daily logs.", fields:["Item / Shed Name","Type","Opening Stock","Received","Used","Balance","Supplier","Shed Capacity","Occupied Animals","Date","Notes"]},
  {id:"rescue-admission", name:"Rescue & Admission Module", desc:"Rescue request, geo-tagging, transport, expenses and intake.", fields:["Rescue ID","Animal Type","Rescue Location","Reporter Name","Reporter Mobile","Vehicle Number","Transport Cost","Emergency Treatment","Admission Date","Status","Notes"]},
  {id:"donation-sponsorship", name:"Donation, Sponsorship & Public Portal", desc:"Donor management, receipts, sponsor-a-cow and public engagement.", fields:["Donor Name","Mobile","Email","Donation Amount","Donation Mode","Transaction ID","Purpose","Receipt Number","Sponsored Animal ID","Date","Notes"]},
  {id:"accounts-products", name:"Accounts & By-products Management", desc:"Income/expense, gobar, gaumutra, compost revenue and reports.", fields:["Entry Type","Category","Amount","Payment Mode","Product Name","Quantity","Buyer / Vendor","Date","Bill Number","Notes"]},
  {id:"staff-doctors", name:"Staff, Doctors & Volunteers", desc:"Attendance, payroll, roles, vet consultation and visitor tracking.", fields:["Name","Role","Mobile","Email","Duty Area","Attendance Date","Salary / Honorarium","Shift","ID Proof","Status","Notes"]},
  {id:"documents-compliance", name:"Documents & Compliance", desc:"Legal docs, audit files, death, transfer and adoption records.", fields:["Document Title","Document Type","Related Animal ID","Certificate Number","Issue Date","Expiry Date","Authority","Status","File Location / Link","Notes"]},
  {id:"reports-alerts", name:"Reports, Alerts & Multi-Branch", desc:"Dashboards, automated alerts and multi-location management.", fields:["Branch Name","Report Type","Alert Type","Priority","Related Module","Responsible Person","Due Date","Status","Summary","Notes"]},
  {id:"security-mobile", name:"Security & Mobile Features", desc:"Role-based access, audit logs, backup reminders and mobile alerts.", fields:["User / Staff Name","Role","Access Level","Mobile","Action","Device","Backup Date","Alert Type","Status","Notes"]},
  {id:"cow-economy", name:"Cow Economy Management System", desc:"Lifecycle revenue mapping and circular Gaushala economy dashboard.", fields:["Animal ID","Lifecycle Stage","Expense Category","Expense Amount","Revenue Source","Revenue Amount","Net Result","Date","Notes"]},
  {id:"feed-intelligence", name:"Advanced Cow Database & Feed Intelligence", desc:"Productivity analytics and feeding optimization.", fields:["Animal ID","Feed Plan","Daily Cost","Milk Output","Weight","Productivity Score","Recommendation","Date","Notes"]},
  {id:"workforce-automation", name:"Advanced Health & Workforce Automation", desc:"Task allocation, performance tracking, emergency alerts and vet scheduling.", fields:["Task Title","Assigned To","Role","Related Animal ID","Priority","Start Date","Due Date","Status","Performance Notes"]},
  {id:"gau-products", name:"Gau Product Revenue Engine", desc:"Gobar, gau-kasht, fertilizers and product lifecycle tracking.", fields:["Product Name","Batch Number","Raw Material","Quantity Produced","Production Cost","Selling Price","Stock Balance","Date","Notes"]},
  {id:"cremation-gaukasht", name:"Cremation / Gau-Kasht Integration", desc:"Supply tracking and environmental impact metrics.", fields:["Supply Date","Buyer / Crematorium","Gau-Kasht Quantity","Amount","Transport Detail","Carbon Impact Estimate","Payment Status","Notes"]},
  {id:"cow-adoption", name:"Cow Adoption Platform", desc:"Digital adoption system with transparency dashboards.", fields:["Adopter Name","Mobile","Email","Animal ID","Adoption Plan","Start Date","Amount","Update Frequency","Status","Notes"]},
  {id:"live-monitoring", name:"Transparency & Live Monitoring", desc:"CCTV/live feed readiness and health/activity tracking.", fields:["Camera / Sensor Name","Location","Feed URL / Device ID","Status","Responsible Person","Check Date","Issue Found","Notes"]},
  {id:"community-mobile", name:"Web, Mobile & Community Integration", desc:"Android app, virtual tours, workshops and events.", fields:["Event / Activity Name","Type","Date","Location","Organizer","Participants","Mobile App Feature","Public Link","Notes"]},
  {id:"marketplace", name:"eCommerce & Marketplace", desc:"Farm product sales and subscription delivery readiness.", fields:["Product Name","Category","Price","Stock","Subscription Available","Buyer Name","Order Quantity","Order Status","Date","Notes"]},
  {id:"sustainability", name:"Sustainability & Analytics Engine", desc:"Carbon credit, environmental impact and sustainability dashboards.", fields:["Indicator Name","Category","Measured Value","Unit","Period","Carbon Estimate","Impact Summary","Verified By","Notes"]}
];

let activeModuleId = modules[0].id;
let editRecordId = null;

function $(id){return document.getElementById(id)}
function getModule(id){return modules.find(m=>m.id===id) || modules[0]}
function loadRecords(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []}catch(e){return []}}
function saveRecords(records){localStorage.setItem(STORAGE_KEY, JSON.stringify(records))}
function toast(msg){const t=$("toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2300)}

function init(){
  renderFeatureCards();
  renderModuleList();
  renderForm();
  renderFilterOptions();
  renderRecords();
  renderReports();
  bind();
}

function bind(){
  const menu = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".main-nav");
  menu?.addEventListener("click",()=>nav.classList.toggle("open"));
  $("recordModuleFilter").addEventListener("change", e=>{activeModuleId=e.target.value; editRecordId=null; renderModuleList(); renderForm(); renderRecords(); scrollToSection("records")});
  $("recordSearch").addEventListener("input", renderRecords);
  $("exportCsvBtn").addEventListener("click", exportCsv);
  $("printRecordsBtn").addEventListener("click", ()=>window.print());
  $("clearRecordsBtn").addEventListener("click", clearCurrentModule);
  $("fillSampleBtn").addEventListener("click", fillSample);
  $("clearFormBtn").addEventListener("click", ()=>{editRecordId=null; renderForm();});
}

function renderFeatureCards(){
  $("featuresGrid").innerHTML = modules.map((m,i)=>`
    <button class="feature-card" type="button" data-open-module="${m.id}">
      <span class="num">${String(i+1).padStart(2,"0")}</span>
      ${gmFeatureIcon(i)}
      <strong>${gmT(m.name)}</strong>
      
      
    </button>`).join("");
  document.querySelectorAll("[data-open-module]").forEach(btn=>btn.addEventListener("click",()=>{
    selectModule(btn.dataset.openModule);
    scrollToSection("registration");
  }));
}

function renderModuleList(){
  $("moduleList").innerHTML = modules.map((m,i)=>`
    <button class="module-btn ${m.id===activeModuleId?"active":""}" type="button" data-module="${m.id}">
      ${i+1}. ${gmT(m.name)}
    </button>`).join("");
  document.querySelectorAll("[data-module]").forEach(btn=>btn.addEventListener("click",()=>selectModule(btn.dataset.module)));
}

function selectModule(id){
  activeModuleId=id; editRecordId=null;
  $("recordModuleFilter").value=id;
  renderModuleList(); renderForm(); renderRecords(); renderReports();
}

function renderForm(){
  const m = getModule(activeModuleId);
  $("activeModuleTitle").textContent = editRecordId ? gmT("Edit")+" "+gmT(m.name) : gmT(m.name);
  $("activeModuleDesc").textContent = m.desc;
  const current = editRecordId ? loadRecords().find(r=>r.id===editRecordId) : null;
  const values = current?.data || {};
  const fieldsHtml = m.fields.map((field, idx)=>{
    const key = slug(field);
    const val = values[key] || "";
    const isLong = /address|notes|message|summary|recommendation/i.test(field);
    const type = /date/i.test(field) ? "date" : /amount|cost|price|quantity|stock|count|capacity|area|produced|sold|used|balance|score|value/i.test(field) ? "number" : /email/i.test(field) ? "email" : /mobile|phone/i.test(field) ? "tel" : "text";
    if(isLong){
      return `<div class="field full"><label>${gmT(field)}</label><textarea name="${key}" placeholder="${gmT(field)}">${escapeHtml(val)}</textarea></div>`;
    }
    return `<div class="field"><label>${gmT(field)}</label><input name="${key}" type="${type}" value="${escapeAttr(val)}" placeholder="${gmT(field)}" ${idx<2?"required":""}></div>`;
  }).join("");
  $("dynamicForm").innerHTML = '<div class="form-grid">'+fieldsHtml+'</div><div class="form-actions"><button class="btn primary" type="submit">'+(editRecordId?gmT("Update Record"):gmT("Save Record"))+'</button><a class="btn outline-dark" href="#records">'+gmT("View Records")+'</a></div>';
  $("dynamicForm").onsubmit = handleSubmit;
}

function handleSubmit(e){
  e.preventDefault();
  const m = getModule(activeModuleId);
  const fd = new FormData(e.target);
  const data = {};
  m.fields.forEach(f=>{data[slug(f)] = (fd.get(slug(f)) || "").toString().trim()});
  const records = loadRecords();
  if(editRecordId){
    const idx = records.findIndex(r=>r.id===editRecordId);
    if(idx>=0){records[idx].data=data; records[idx].updatedAt=new Date().toISOString();}
    toast("Record updated successfully");
  } else {
    records.unshift({id: cryptoId(), moduleId: activeModuleId, moduleName: m.name, data, createdAt:new Date().toISOString(), updatedAt:null});
    toast("Record saved successfully");
  }
  saveRecords(records);
  editRecordId=null;
  renderForm(); renderRecords(); renderReports();
  scrollToSection("records");
}

function renderFilterOptions(){
  $("recordModuleFilter").innerHTML = modules.map(m=>`<option value="${m.id}">${gmT(m.name)}</option>`).join("");
  $("recordModuleFilter").value=activeModuleId;
}

function currentRecords(){
  const q = $("recordSearch")?.value?.toLowerCase() || "";
  return loadRecords().filter(r=>r.moduleId===activeModuleId).filter(r=>!q || JSON.stringify(r).toLowerCase().includes(q));
}

function renderRecords(){
  const m = getModule(activeModuleId);
  const records = currentRecords();
  const visibleFields = m.fields.slice(0,5);
  $("recordsHead").innerHTML = `<tr><th>Date</th>${visibleFields.map(f=>`<th>${f}</th>`).join("")}<th>Actions</th></tr>`;
  $("recordsBody").innerHTML = records.length ? records.map(r=>`
    <tr>
      <td>${formatDate(r.createdAt)}</td>
      ${visibleFields.map(f=>`<td>${escapeHtml(r.data[slug(f)] || "-")}</td>`).join("")}
      <td><div class="row-actions"><button class="mini-btn mini-edit" onclick="editRecord('${r.id}')">Edit</button><button class="mini-btn mini-delete" onclick="deleteRecord('${r.id}')">Delete</button></div></td>
    </tr>`).join("") : `<tr><td colspan="${visibleFields.length+2}">No records found. Add a record from the form above.</td></tr>`;
  renderSummary();
}

function renderSummary(){
  const all = loadRecords();
  const current = all.filter(r=>r.moduleId===activeModuleId);
  const today = new Date().toISOString().slice(0,10);
  const todayCount = current.filter(r=>r.createdAt.slice(0,10)===today).length;
  $("summaryGrid").innerHTML = `
    <div class="summary-card"><strong>${current.length}</strong><span>Current Module Records</span></div>
    <div class="summary-card"><strong>${todayCount}</strong><span>Added Today</span></div>
    <div class="summary-card"><strong>${all.length}</strong><span>Total All Records</span></div>
    <div class="summary-card"><strong>${modules.length}</strong><span>Working Modules</span></div>`;
}

function renderReports(){
  const all = loadRecords();
  $("reportGrid").innerHTML = modules.map(m=>{
    const count = all.filter(r=>r.moduleId===m.id).length;
    const latest = all.find(r=>r.moduleId===m.id);
    return `<div class="report-card"><strong>${count}</strong><span>${gmT(m.name)}</span><p>${latest ? "Latest: "+formatDate(latest.createdAt) : "No record yet"}</p></div>`;
  }).join("");
}

window.editRecord = function(id){
  const rec = loadRecords().find(r=>r.id===id);
  if(!rec) return;
  activeModuleId = rec.moduleId;
  editRecordId = id;
  $("recordModuleFilter").value=activeModuleId;
  renderModuleList(); renderForm(); renderRecords();
  scrollToSection("registration");
}

window.deleteRecord = function(id){
  if(!confirm("Delete this record?")) return;
  const records = loadRecords().filter(r=>r.id!==id);
  saveRecords(records);
  toast("Record deleted");
  renderRecords(); renderReports();
}

function clearCurrentModule(){
  const m = getModule(activeModuleId);
  if(!confirm(`Delete all records from ${gmT(m.name)}?`)) return;
  saveRecords(loadRecords().filter(r=>r.moduleId!==activeModuleId));
  toast("Current module records cleared");
  renderRecords(); renderReports();
}

function exportCsv(){
  const m = getModule(activeModuleId);
  const rows = currentRecords();
  if(!rows.length){toast("No records to export"); return;}
  const headers = ["Created At", ...m.fields];
  const csv = [headers, ...rows.map(r=>[formatDate(r.createdAt), ...m.fields.map(f=>r.data[slug(f)] || "")])]
    .map(row=>row.map(cell=>`"${String(cell).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href=url; a.download=`${m.id}-records.csv`; a.click();
  URL.revokeObjectURL(url);
}

function fillSample(){
  const m = getModule(activeModuleId);
  const form = $("dynamicForm");
  m.fields.forEach((field,i)=>{
    const el = form.elements[slug(field)];
    if(!el) return;
    if(el.type === "date") el.value = new Date().toISOString().slice(0,10);
    else if(el.type === "number") el.value = String((i+1)*10);
    else if(/mobile|phone/i.test(field)) el.value = "9876543210";
    else if(/email/i.test(field)) el.value = "info@nkctrust.org";
    else el.value = `${gmT(field)} sample`;
  });
}

function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
function slug(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}
function cryptoId(){return "gm_"+Date.now()+"_"+Math.random().toString(16).slice(2)}
function formatDate(iso){return new Date(iso).toLocaleString()}
function escapeHtml(v){return String(v).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function escapeAttr(v){return escapeHtml(v)}

document.addEventListener("DOMContentLoaded", init);
var gmLangText={"hi": {"Trusted Gaushala Digital Platform": "विश्वसनीय गौशाला डिजिटल प्लेटफॉर्म", "Smart Gaushala": "स्मार्ट गौशाला", "Open Registration": "रजिस्ट्रेशन खोलें", "Open Modules": "मॉड्यूल देखें", "View Records": "रिकॉर्ड देखें", "About": "परिचय", "Modules": "मॉड्यूल", "Registration": "रजिस्ट्रेशन", "Records": "रिकॉर्ड", "Reports": "रिपोर्ट", "Donate": "दान करें", "Start Registration": "रजिस्ट्रेशन शुरू करें", "Gaushala Registration": "गौशाला रजिस्ट्रेशन", "Animal Records": "पशु रिकॉर्ड", "Donation Records": "दान रिकॉर्ड", "Contact GauMitra Team": "गौमित्र टीम से संपर्क करें", "Office Address": "ऑफिस पता"}, "gu": {"Trusted Gaushala Digital Platform": "વિશ્વસનીય ગૌશાળા ડિજિટલ પ્લેટફોર્મ", "Smart Gaushala": "સ્માર્ટ ગૌશાળા", "Open Registration": "રજિસ્ટ્રેશન ખોલો", "Open Modules": "મોડ્યુલ જુઓ", "View Records": "રેકોર્ડ જુઓ", "About": "વિશે", "Modules": "મોડ્યુલ", "Registration": "રજિસ્ટ્રેશન", "Records": "રેકોર્ડ", "Reports": "રિપોર્ટ", "Donate": "દાન કરો", "Start Registration": "રજિસ્ટ્રેશન શરૂ કરો", "Gaushala Registration": "ગૌશાળા રજિસ્ટ્રેશન", "Animal Records": "પશુ રેકોર્ડ", "Donation Records": "દાન રેકોર્ડ", "Contact GauMitra Team": "ગૌમિત્ર ટીમનો સંપર્ક કરો", "Office Address": "ઓફિસ સરનામું"}};
function gmT(x){var lang=localStorage.getItem('gm_lang')||'en';if(lang==='en'||typeof gmLangText==='undefined')return x;var map=gmLangText[lang]||{};return map[x]||x}
function gmApplyLanguage(lang){var map=gmLangText[lang]||{};document.querySelectorAll("a,button,h2,h3,p,span,strong,label,dt").forEach(function(el){if(el.children.length)return;var o=el.getAttribute("data-gm-original")||el.textContent.trim();if(!o)return;if(!el.getAttribute("data-gm-original"))el.setAttribute("data-gm-original",o);el.textContent=(lang==="en")?o:(map[o]||o)});try{localStorage.setItem("gm_lang",lang)}catch(e){}}
document.addEventListener("DOMContentLoaded",function(){var s=document.getElementById("languageSelect");if(!s)return;var saved=localStorage.getItem("gm_lang")||"en";s.value=saved;setTimeout(function(){gmApplyLanguage(saved);renderFeatureCards();renderModuleList();renderFilterOptions();renderForm();document.getElementById("recordModuleFilter").value=activeModuleId},150);s.addEventListener("change",function(){gmApplyLanguage(this.value);renderFeatureCards();renderModuleList();renderFilterOptions();renderForm();document.getElementById("recordModuleFilter").value=activeModuleId})});


Object.assign(gmLangText.hi,{'Health Logs':'स्वास्थ्य रिकॉर्ड','Rescue Workflow':'रेस्क्यू प्रक्रिया','Reports Export':'रिपोर्ट एक्सपोर्ट','Animal Master & Registration':'पशु मास्टर और रजिस्ट्रेशन','Health & Medical Management':'स्वास्थ्य और मेडिकल प्रबंधन','Breeding & Calf Management':'प्रजनन और बछड़ा प्रबंधन','Feeding & Milk Management':'फीडिंग और दूध प्रबंधन','Inventory & Shed Operations':'इन्वेंटरी और शेड संचालन','Rescue & Admission Module':'रेस्क्यू और प्रवेश मॉड्यूल','Staff, Doctors & Volunteers':'स्टाफ, डॉक्टर और स्वयंसेवक'});Object.assign(gmLangText.gu,{'Health Logs':'આરોગ્ય રેકોર્ડ','Rescue Workflow':'રેસ્ક્યુ પ્રક્રિયા','Reports Export':'રિપોર્ટ એક્સપોર્ટ','Animal Master & Registration':'પશુ માસ્ટર અને રજિસ્ટ્રેશન','Health & Medical Management':'આરોગ્ય અને મેડિકલ મેનેજમેન્ટ','Breeding & Calf Management':'પ્રજનન અને વાછરડું મેનેજમેન્ટ','Feeding & Milk Management':'ફીડિંગ અને દૂધ મેનેજમેન્ટ','Inventory & Shed Operations':'ઇન્વેન્ટરી અને શેડ ઓપરેશન','Rescue & Admission Module':'રેસ્ક્યુ અને એડમિશન મોડ્યુલ','Staff, Doctors & Volunteers':'સ્ટાફ, ડોક્ટર અને વોલન્ટિયર'});
Object.assign(gmLangText.hi,{'Documents & Compliance':'दस्तावेज़ और अनुपालन','Reports, Alerts & Multi-Branch':'रिपोर्ट, अलर्ट और मल्टी-ब्रांच','Security & Mobile Features':'सुरक्षा और मोबाइल फीचर','Cow Economy Management System':'गौ अर्थव्यवस्था प्रबंधन सिस्टम','Advanced Cow Database & Feed Intelligence':'उन्नत गौ डेटाबेस और फीड इंटेलिजेंस','Advanced Health & Workforce Automation':'उन्नत स्वास्थ्य और कार्यबल ऑटोमेशन','Gau Product Revenue Engine':'गौ उत्पाद राजस्व सिस्टम','Cremation / Gau-Kasht Integration':'गौ-काष्ठ इंटीग्रेशन','Cow Adoption Platform':'गौ गोद लेने का प्लेटफॉर्म','Transparency & Live Monitoring':'पारदर्शिता और लाइव मॉनिटरिंग','Web, Mobile & Community Integration':'वेब, मोबाइल और समुदाय इंटीग्रेशन','eCommerce & Marketplace':'ईकॉमर्स और मार्केटप्लेस','Sustainability & Analytics Engine':'सस्टेनेबिलिटी और एनालिटिक्स इंजन'});Object.assign(gmLangText.gu,{'Documents & Compliance':'દસ્તાવેજો અને અનુપાલન','Reports, Alerts & Multi-Branch':'રિપોર્ટ, એલર્ટ અને મલ્ટી-બ્રાંચ','Security & Mobile Features':'સિક્યુરિટી અને મોબાઇલ ફીચર્સ','Cow Economy Management System':'ગૌ અર્થતંત્ર મેનેજમેન્ટ સિસ્ટમ','Advanced Cow Database & Feed Intelligence':'અદ્યતન ગૌ ડેટાબેઝ અને ફીડ ઇન્ટેલિજન્સ','Advanced Health & Workforce Automation':'અદ્યતન આરોગ્ય અને વર્કફોર્સ ઓટોમેશન','Gau Product Revenue Engine':'ગૌ પ્રોડક્ટ રેવન્યુ સિસ્ટમ','Cremation / Gau-Kasht Integration':'ગૌ-કાષ્ઠ ઇન્ટિગ્રેશન','Cow Adoption Platform':'ગૌ દત્તક પ્લેટફોર્મ','Transparency & Live Monitoring':'પારદર્શિતા અને લાઇવ મોનિટરિંગ','Web, Mobile & Community Integration':'વેબ, મોબાઇલ અને સમુદાય ઇન્ટિગ્રેશન','eCommerce & Marketplace':'ઇકોમર્સ અને માર્કેટપ્લેસ','Sustainability & Analytics Engine':'સસ્ટેનેબિલિટી અને એનાલિટિક્સ એન્જિન'});













function gmFeatureIcon(i){var a=['&#128221;','&#128004;','&#9877;','&#128046;','&#129371;','&#127981;','&#128657;','&#128591;','&#128176;','&#128101;','&#128196;','&#128202;','&#128274;','&#127793;','&#129504;','&#9881;','&#128722;','&#128293;','&#129309;','&#128247;','&#128241;','&#128717;','&#127807;'];return '<span class=feature-visual aria-hidden=true><span class=feature-emoji>'+(a[i]||'&#128004;')+'</span></span>';}

