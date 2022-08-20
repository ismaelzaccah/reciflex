import {extenso} from "./extenso.js";
String.prototype.extenso = extenso;
import { writeInTag } from "./writeInTag.js";

//Tela de Campos, Tela de impressão
const screen          = document.querySelector("form")
const printer         = document.querySelector("main")
//Campos Digitaveis  
const clientField     = document.querySelector("#clientField")
const numField        = document.querySelector("#numField")
const refTextField    = document.querySelector("#refTextField")
const todayCheckbox	  = document.querySelector("#todayCheckbox")
const dateField		  = document.querySelector("#dateField")
//Botões
const buttonRender    = document.querySelector("#render")
const buttonCreateNew = document.querySelector("#createNew")
const buttonPrint     = document.querySelector("#print")
//Tags que receberão os dados ao renderizar
const clientWrite     = document.querySelector("#clientWrite")
const refTextWrite    = document.querySelector("#refTextWrite")
const numExtWrite     = document.querySelector("#numExtWrite")
const numWrite        = document.querySelector("#numWrite")
const dateWrite       = document.querySelector("#dateWrite")
const signatureWrite = document.querySelector("#signatureWrite")
//Botões de --Imprimir-- e --Criar Novo-- da tela renderizada
buttonCreateNew.addEventListener("click", ()=>{
	window.location.reload()})
buttonPrint.addEventListener("click", ()=>{
		window.print()})

//Habilita o campo de DATA para entrada manual
todayCheckbox.addEventListener("change", ()=>{
	if (todayCheckbox.checked){
		dateField.disabled = true
	} else {
		dateField.disabled = false
	}
})

//Data de hoje Automática 
const today           = new Date()
const monthExt        = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
var date 
		
//Ação do botão --Gerar Recibo-- da tela de Campos
buttonRender.addEventListener("click", (event)=>{
	event.preventDefault()

	//Campo de data
	if (todayCheckbox.checked){
		date = `Fortaleza, ${today.getDate()} de ${monthExt[today.getMonth()]} de ${today.getFullYear()}`
	} else {
		date = dateField.value.split("-")
		date[0] = parseInt(date[0], 10) //Ano YYYY
		date[1] = parseInt(date[1], 10) //Mês MM
		date[2] = parseInt(date[2], 10) //Dia DD
		date = `Fortaleza, ${date[2]} de ${monthExt[--date[1]]} de ${date[0]}`
	}
	//Assinatura Variavel
	var signature = document.querySelector("input[name=signature]:checked")
	if (signature == null){
			signatureWrite.src = ""
			console.log(signature)
	} else {
		signatureWrite.src = `./img/signature${signature.value}.jpg`
		console.log(signature)
	}
	//Remove epaços do do inicio/fim da string
	var client = clientField.value.trim()
	var refText = refTextField.value.trim()
	var num = numField.value.trim()
	
	//trata e converte o valor para extenso
	num = num.replace(".", ",")
	var numExt = num.extenso(true)
	num = "R$ " + num

	writeInTag(client, clientWrite)	
	writeInTag(refText, refTextWrite)
	writeInTag(num, numWrite)
	writeInTag(numExt, numExtWrite)
	writeInTag(date, dateWrite)
	
	screen.classList.add("off")
	printer.classList.remove("off")
})