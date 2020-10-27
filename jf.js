//var emailAPIBaseURL='https://www.bcause-api.com/';
//var emailAPIBaseURL = 'http://localhost:58579/';
var reqData={};
function SendEmailRequest(model, endpoint) {
  let xhr = new XMLHttpRequest();
  let formdata = new FormData();

  formdata.append('model', JSON.stringify(model));

  xhr.open('POST', endpoint, true);
  xhr.onreadystatechange = function (response) {

    if (this.readyState == 4 && this.status == 200) {
      window.location='/thankyou';
      emailModelData = {};
    } else if (this.readyState == 4 && this.status != 200) {
      alert('Message sent Failed!!.');

      emailModelData = {};
    }

  };

  xhr.send(formdata);
  // closeSendingModal();
}

function clearForm() {
  document.querySelector('#email').value = "";
  document.querySelector('#company_name').value = "";
  document.querySelector("#personInCharge").value = "";
  document.querySelector("#postCode").value = "";
  document.querySelector("#streetAddress").value = "";
  document.querySelector("#textMessage").value = "";
  document.querySelector("#phone").value = "";

  let chkGroup = document.querySelectorAll(".chkgrp");
  chkGroup.forEach(item => {
    if (item.checked) {
      item.checked = false;
    }
  });
}

//chracter count
function countChars(countfrom,displayto) {
  var len = document.getElementById(countfrom).value.length;
  document.getElementById(displayto).innerHTML = len;
}
// function countChars(countfrom,displayto) {
//   var len = document.getElementById(countfrom).value.length;
//   document.getElementById(displayto).innerHTML = len;
// }

// --------- Inquery Page Validation ----------//
// function isEmpty(element){
//   if(element.vlaue === ''){
//     element.classList.add('is-invalid');
//     element.nextSibling.innerText = 'Please fill this filed'
//     element.nextSibling.classList.add('invalid-feedback');
//     // return true;
//   }else{
//     element.classList.remove('is-invalid');
//     element.nextSibling.classList.remove('invalid-feedback');
//     // return false
//   }

//   return true;
// }

function checkMaxLength(element, len){
  if(element.value.length > len){
    element.classList.add('is-invalid')
    element.nextElementSibling.innerText = 'Not more than 400 character'
    element.nextElementSibling.classList.add('invalid-feedback')
    return true;
  }else{
    element.classList.remove('is-invalid')
    element.nextElementSibling.classList.remove('invalid-feedback')
    element.nextElementSibling.innerText = ''
    return false;
  }
}

function checkMaxLength1(element, len){
  if(element.value.length > len){
    element.classList.add('is-invalid')
    // element.nextElementSibling.innerText = 'Not more than 400 character'
     element.nextElementSibling.classList.add('invalid-feedback')
    return true;
  }else{
    element.classList.remove('is-invalid')
    // element.nextElementSibling.classList.remove('invalid-feedback')
     element.nextElementSibling.innerText = ''
    return false;
  }
}


function inqueryFormValidation(){
  let result = true;
  // const email = document.querySelector("#email")
  // const personInCharge = document.querySelector("#personInCharge")
  // const phone = document.querySelector("#phone")
  //const txtAreaBusiness = document.querySelector("#txtAreaBusiness")
 //const txtAreaCompany = document.querySelector("#txtAreaCompany")
  const textMessage = document.querySelector("#textMessage")
  // if(isEmpty(email) == false && isEmpty(personInCharge) == false && isEmpty(phone) == false && isEmpty(textMessage) == false){
  //   return true;
  // }

 

 
  if(checkMaxLength(textMessage, 400)){
    result = false; // invalid
  }
  return result;
}

function SendEmail() {

  let result = inqueryFormValidation();
  if(result == false){
    return;
  }

  let chkGroup = document.querySelectorAll(".chkgrp");
  let checkListItems = [];
  chkGroup.forEach(item => {

    if (item.checked) {
      checkListItems.push(item.value);
    }
  });

  let email = document.querySelector('#email').value;
  let CompanyName = document.querySelector('#company_name').value;
  let PersonInCharge = document.querySelector("#personInCharge").value;
  let PostCode = document.querySelector("#postCode").value;
  let StreetAddress = document.querySelector("#streetAddress").value;
  let Phone = document.querySelector("#phone").value;
  let TextMessage = document.querySelector("#textMessage").value;



  let model = {};
  model.ClientCompanyName = CompanyName;
  model.ClientPICName = PersonInCharge;
  model.ClientPostalCode = PostCode;
  model.ClientAddress = StreetAddress;
  model.ClientPhoneNumber = Phone;
  model.ClientMessage = TextMessage;
  model.ClientEmailAddress = email;
  model.VideoTheme = checkListItems.join(',');
  model.RecipientToAddressCSV = email;
  model.RecipientBCCAddressCSV='info@jfhra.org';
  model.TemplateCode = "JFHRA001";
  let endpoint = emailAPIBaseURL + 'BcauseExternalEmailApi/JFHRAInquerySendEmail';
  SendEmailRequest(model, endpoint);

}




function emailValidator(email){
  let regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  return regExp.test(email);
}

function requiredFieldBlurValidation() {
  const txtEmail = document.querySelector("#txtEmail")
  const txtEmailReEnter = document.querySelector("#txtEmailReEnter")
  const txtContactName = document.querySelector("#txtContactName")
  const txtPhoneNumber = document.querySelector("#txtPhoneNumber")
  

  txtEmail.addEventListener('blur', () => {
    if(emailValidator(txtEmail.value)){
      txtEmail.classList.remove('is-invalid')
    }else{
      txtEmail.classList.add('is-invalid')
      }
  })

  txtEmailReEnter.addEventListener('blur', () => {
    if(txtEmailReEnter.value === ''){
      txtEmailReEnter.classList.add('is-invalid')
    }else{
      txtEmailReEnter.classList.remove('is-invalid')
    }
  })


  txtContactName.addEventListener('blur', () => {
    if(txtContactName.value === ''){
      txtContactName.classList.add('is-invalid')
    }else{
      txtContactName.classList.remove('is-invalid')
    }
  })

  txtPhoneNumber.addEventListener('blur', () => {
    if(txtPhoneNumber.value === ''){
      txtPhoneNumber.classList.add('is-invalid')
    }else{
      txtPhoneNumber.classList.remove('is-invalid')
    }
  })
}

function SendInquery2Email() {
  ///n

  if (!ValidateEmail()) {
    return;
  }

  const AreaBusiness = document.querySelector("#txtAreaBusiness")
  const AreaCompany = document.querySelector("#txtAreaCompany")
  const txtEmail = document.querySelector("#txtEmail").value;
  const txtEmailReEnter = document.querySelector("#txtEmailReEnter").value;
  const txtContactName = document.querySelector("#txtContactName").value;
  const txtPhoneNumber = document.querySelector("#txtPhoneNumber").value;
  const txtChkMembership_1 = document.querySelector('#chkMembership_1').checked;
  const txtChkMembership_2 = document.querySelector('#chkMembership_2').checked;
  const txtChkMembership_3 = document.querySelector('#chkMembership_3').checked;

  if (txtChkMembership_1== false && txtChkMembership_2== false && txtChkMembership_3== false){
    alert('Please fill in all required fields.');
    return ;

  }
  if(txtEmail=='' || txtEmailReEnter == '' || txtContactName == '' || txtPhoneNumber == ''){
    alert('Please fill in all required fields.');
    return;
  }
 let atLeastOneSelected = false;
  for (let i = 1; i <= 23; i++) {
    let chk = document.querySelector('#chk_industry_' + i);
    if (chk.checked) {
      atLeastOneSelected= true;
    }
  }
  if(atLeastOneSelected== false){
    alert('Please fill in all required fields.');
    return;
  }

  if(AreaBusiness.value.length > 300){
    AreaBusiness.classList.add('is-invalid')
    return true;
  }else{
    
    AreaBusiness.classList.remove('is-invalid')
  }


  if(AreaCompany.value.length >=300){
    AreaCompany.classList.add('is-invalid')
    return;
  }else{
    AreaCompany.classList.remove('is-invalid')
  }


  let membershipTypes = '';
  let mType = [];
  for (let i = 1; i <= 3; i++) {
    let chk = document.querySelector('#chkMembership_' + i);
    if (chk.checked) {
      mType.push(chk.value);
    }
  }

  membershipTypes = mType.join();

  let Email = document.querySelector('#txtEmail').value;
  let EmailReEnter = document.querySelector('#txtEmailReEnter').value;
  let CompanyName = document.querySelector('#txtCompanyName').value;
  let DepartmentName = document.querySelector('#txtDepartmentName').value;
  let JobTitle = document.querySelector('#txtJobTitle').value;

  let ContactName = document.querySelector('#txtContactName').value;
  let PhoneNumber = document.querySelector('#txtPhoneNumber').value;
  let PostalCode = document.querySelector('#txtPostalCode').value;

  let StreetAddress = document.querySelector('#chkStreetAddress').value;
  let Prefecture = document.querySelector('#selPrefecture').value;
  let CityName = document.querySelector('#txtCityName').value;
  let BuildingName = document.querySelector('#txtBuildingName').value;

  let Overseas = document.querySelector('#chkOverseas').value;
  let Country = document.querySelector('#selCountry').value;
  let State = document.querySelector('#txtState').value;
  let Address = document.querySelector('#txtAddress').value;
  let AddressLine1 = document.querySelector('#txtAddressLine1').value;

  let WebSiteURL = document.querySelector('#txtWebSiteURL').value;
  let CEO = document.querySelector('#txtCEO').value;
  let EstablishmentDate = document.querySelector('#txtEstablishmentDate').value;
  let Capital = document.querySelector('#txtCapital').value;
  let Currency = document.querySelector('#selCurrency').value;
  let NumberOfEmployees = document.querySelector('#txtNumberOfEmployees').value;

  let Others = document.querySelector('#txtOthers').value;
  let AreaBusinessV = document.querySelector('#txtAreaBusiness').value;

  let AreaCompanyV = document.querySelector('#txtAreaCompany').value;
  let ForeignerRecord = document.querySelector('#txtForeignerRecord').value;
  let chkNone = document.querySelector('#chkNone');
  let ReceiveMsgEN = document.querySelector('#rdoReceiveMsgEN').value;
  let ReceiveMsgJP = document.querySelector('#rdoReceiveMsgJP').value;
  let chkIsAgree = document.querySelector('#chkAgree');

  //n

  let industries = '';
  let iType = [];
  for (let i = 1; i <= 23; i++) {
    let chk = document.querySelector('#chk_industry_' + i);
    if (chk.checked) {
      iType.push(chk.value);
    }
  }
  industries = iType.join();

  let model = {};

  model.TypesOfMemberships = membershipTypes;
  model.UsersMailAddress = Email;
  model.ClientEmailAddress = Email;
  model.ClientCompanyName = CompanyName;
  model.DepartmentName = DepartmentName;
  model.PositionName = JobTitle;
  model.UsersName = ContactName;
  model.ClientPhoneNumber = PhoneNumber;
  model.ClientPostalCode = PostalCode;

  const chkOverseas = document.getElementById('chkOverseas');
  if(chkOverseas.checked)
  {
    model.ClientAddress = Country+' '+State +' '+Address+' '+AddressLine1;
  }
  else
  {
    model.ClientAddress = Prefecture+' '+CityName +' '+BuildingName;
  }

  
  
  model.WebSiteURL = WebSiteURL;
  model.ClientPICName = CEO;
  model.EstablishmentDate = EstablishmentDate;
  model.Capital = Capital + ' ' + Currency;
  model.NumberOfEmployees = NumberOfEmployees+'人';
  model.TypeOfIndustry = industries;
  model.BusinessContentsText = AreaBusinessV;
  model.CompanyIntroduction = AreaCompanyV;
  model.ForeignEmployees = chkNone.checked? '>なし' : ForeignerRecord+'人';
  model.MailReceiveLanguage= ReceiveMsgJP? '日本語でメッセージを受け取る' : '英語でメッセージを受け取る';
  model.RecipientToAddressCSV = 'info@jfhra.org';
  model.TemplateCode = "JFHRA002";


  if (chkIsAgree.checked) {
    reqData=model;
      showModal();

  } else {
    console.log("You didn't aggree");
  }

}

function ValidateIndustrySelection() {
  let iType = [];
  for (let i = 1; i <= 23; i++) {
    let chk = document.querySelector('#chk_industry_' + i);
    if (chk.checked) {
      iType.push(chk.value);
    }
  }

  if (iType.length <= 5) {
    return true;
  }
  else {
    return false;
  }
}

function bindIndCheckboxEvent() {
  for (let i = 1; i <= 23; i++) {
    let chk = document.querySelector('#chk_industry_' + i);
    chk.addEventListener('click', function (e) {
      if (!ValidateIndustrySelection()) {
        alert('You can select up to 5');
        e.preventDefault();
      }
    });
  }

}

function ValidateEmail() {
  let Email = document.querySelector('#txtEmail').value;
  let EmailReEnter = document.querySelector('#txtEmailReEnter').value;
  let lbl = document.getElementById('lblMsgEmailNotMatch');
  if (Email !== EmailReEnter) {
    lbl.style.display = "inline-block";
    return false;
  }
  else {
    lbl.style.display = "none";
    return true;
  }
}




function selectOneValidation() {
  //const TypesOfMemberships = document.getElementById('membershipTypes');
  const chkStreetAddress = document.getElementById('chkStreetAddress');
  const chkOverseas = document.getElementById('chkOverseas');
  const prefecture = document.querySelector('#selPrefecture');
  const cityName = document.querySelector('#txtCityName');
  const buildingName = document.querySelector('#txtBuildingName');
  const country = document.querySelector('#selCountry');
  const state = document.querySelector('#txtState');
  const address = document.querySelector('#txtAddress');
  const addressLine1 = document.querySelector('#txtAddressLine1');

  if (!chkOverseas.checked) {
    prefecture.removeAttribute('disabled');
    cityName.removeAttribute('disabled');
    buildingName.removeAttribute('disabled');
    country.setAttribute('disabled', 'disabled');
    state.setAttribute('disabled', 'disabled');
    address.setAttribute('disabled', 'disabled');
    addressLine1.setAttribute('disabled', 'disabled');
  } else {
    prefecture.setAttribute('disabled', 'disabled');
    cityName.setAttribute('disabled', 'disabled');
    buildingName.setAttribute('disabled', 'disabled');
    country.removeAttribute('disabled');
    state.removeAttribute('disabled');
    address.removeAttribute('disabled')
    addressLine1.removeAttribute('disabled');
  }


}

function agreeEnDe(){
  if(chkAgree.checked){
    agreeText.style.display = 'none'
  }else{
    agreeText.style.display = 'block'
  }

}



function onBodyLoad() {
  initModal();
  bindIndCheckboxEvent();

  requiredFieldBlurValidation();

  const streetAddress = document.querySelector('#chkStreetAddress');
  const overseas = document.querySelector('#chkOverseas');
  const chkAgree = document.querySelector('#chkAgree');
  const agreeText = document.querySelector("#agreeText");

  streetAddress.addEventListener('click', selectOneValidation);
  overseas.addEventListener('click', selectOneValidation);
  chkAgree.addEventListener('click', agreeEnDe)
}

function switchCheckbox(val) {
  if (val) {
    const chkStreetAddress = document.getElementById('chkStreetAddress');
    chkStreetAddress.checked = false;
  }
  else {
    const chkOverseas = document.getElementById('chkOverseas');
    chkOverseas.checked = false;
  }
}


function foreignerRecDisable(clickedBox){
  const txtForeignerRecord = document.getElementById('txtForeignerRecord');
    txtForeignerRecord.disabled = clickedBox.checked;
  
}


function initModal()
{
  // Modal
  let modal1Area = document.querySelector('.modal1-area');
  let modal1Overlay = document.querySelector('.model-overlay');
  modal1Overlay.addEventListener('click',closeModal);
}

function showModal()
{
  let modal1Area = document.querySelector('.modal1-area');
  let modal1Overlay = document.querySelector('.model-overlay');
  modal1Area.classList.add('show');
  modal1Overlay.classList.add('show');
}

function closeModal(){
  let modal1Area = document.querySelector('.modal1-area');
  let modal1Overlay = document.querySelector('.model-overlay');
  modal1Area.classList.remove('show');
  modal1Overlay.classList.remove('show');
}


function YesCallback()
{
  closeModal();
  sendingModal();
}

function sendingModal(){
  let modalOverlay = document.querySelector('.sending-mode-overlay');
  let modalContent = document.querySelector('.sending-modal-content');
  modalOverlay.classList.add('show')
  modalContent.classList.add('show')

  let endpoint = emailAPIBaseURL + 'BcauseExternalEmailApi/JFHRAInquery2SendEmail';
  SendEmailRequest(reqData, endpoint);
}

function closeSendingModal(){
  let modalOverlay = document.querySelector('.sending-mode-overlay');
  let modalContent = document.querySelector('.sending-modal-content');
  modalOverlay.classList.remove('show')
  modalContent.classList.remove('show')
}