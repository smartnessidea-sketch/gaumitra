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
      <strong>${m.name}</strong>
      <p>${m.desc}</p>
      <small>Click to open working form →</small>
    </button>`).join("");
  document.querySelectorAll("[data-open-module]").forEach(btn=>btn.addEventListener("click",()=>{
    selectModule(btn.dataset.openModule);
    scrollToSection("registration");
  }));
}

function renderModuleList(){
  $("moduleList").innerHTML = modules.map((m,i)=>`
    <button class="module-btn ${m.id===activeModuleId?"active":""}" type="button" data-module="${m.id}">
      ${i+1}. ${m.name}
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
  $("activeModuleTitle").textContent = editRecordId ? `Edit ${m.name}` : m.name;
  $("activeModuleDesc").textContent = m.desc;
  const current = editRecordId ? loadRecords().find(r=>r.id===editRecordId) : null;
  const values = current?.data || {};
  const fieldsHtml = m.fields.map((field, idx)=>{
    const key = slug(field);
    const val = values[key] || "";
    const isLong = /address|notes|message|summary|recommendation/i.test(field);
    const type = /date/i.test(field) ? "date" : /amount|cost|price|quantity|stock|count|capacity|area|produced|sold|used|balance|score|value/i.test(field) ? "number" : /email/i.test(field) ? "email" : /mobile|phone/i.test(field) ? "tel" : "text";
    if(isLong){
      return `<div class="field full"><label>${field}</label><textarea name="${key}" placeholder="${field}">${escapeHtml(val)}</textarea></div>`;
    }
    return `<div class="field"><label>${field}</label><input name="${key}" type="${type}" value="${escapeAttr(val)}" placeholder="${field}" ${idx<2?"required":""}></div>`;
  }).join("");
  $("dynamicForm").innerHTML = `<div class="form-grid">${fieldsHtml}</div><div class="form-actions"><button class="btn primary" type="submit">${editRecordId?"Update Record":"Save Record"}</button><a class="btn outline-dark" href="#records">View Records</a></div>`;
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
  $("recordModuleFilter").innerHTML = modules.map(m=>`<option value="${m.id}">${m.name}</option>`).join("");
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
    return `<div class="report-card"><strong>${count}</strong><span>${m.name}</span><p>${latest ? "Latest: "+formatDate(latest.createdAt) : "No record yet"}</p></div>`;
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
  if(!confirm(`Delete all records from ${m.name}?`)) return;
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
    else el.value = `${field} sample`;
  });
}

function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
function slug(text){return text.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}
function cryptoId(){return "gm_"+Date.now()+"_"+Math.random().toString(16).slice(2)}
function formatDate(iso){return new Date(iso).toLocaleString()}
function escapeHtml(v){return String(v).replace(/[&<>"']/g, m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function escapeAttr(v){return escapeHtml(v)}

document.addEventListener("DOMContentLoaded", init);
