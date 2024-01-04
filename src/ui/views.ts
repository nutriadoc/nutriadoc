import View from "./View.ts";
import Attribute from "./view/attribute/Attribute.ts";
import Content from "./view/content/Content.ts";
import TextContent from "./view/content/TextContent.ts";
import IView from "./IView.ts";
import IUnit from "./view/unit/IUnit.ts";
import StyleUnit from "./view/unit/StyleUnit.ts";
import EventListenerUnit from "./view/listener/EventListenerUnit.ts";
import Property from "./view/attribute/Property.ts";
import ClassName from "./view/attribute/ClassName.ts";

export function div(..._params: IUnit[]): IView {
  return View.new('div').assignUnits(..._params)
}

export function span(...units: IUnit[]): IView {
  return View.new("span").assignUnits(...units)
}
export function style(style: any): IUnit {
  return new StyleUnit(style)
}

export function name(value: string): Attribute {
  return new Attribute("name", value)
}

export function text(text: string): Content {
  return new TextContent(text)
}

export function svg(html: string): IView {
  return div().assignUnits(innerHtml(html))
}

export function innerHtml(html: string): Attribute {
  return new Property("innerHTML", html)
}

export function label(...units: IUnit[]): IView {
  return View.new("label").assignUnits(...units)
}

export function type(value: string): Attribute {
  return new Attribute("type", value)
}

export function id(_id: string): Attribute {
  return new Attribute("id", _id)
}

export function _for(value: string): Attribute {
  return new Attribute("for", value)
}

export function width(value: string): Attribute {
  return new Attribute("width", value)
}

export function value(value: string): Attribute {
  return new Attribute("value", value)
}

export function input(...units: IUnit[]): IView {
  return View.new("input").assignUnits(...units)
}

export function autoFocus(): Attribute {
  return new Attribute("autofocus", "true")
}

export function button(...units: IUnit[]): IView {
  return View.new("button").assignUnits(...units)
}

export function onClick(handler: any): IUnit {
  return new EventListenerUnit("click", handler)
}

export function onChange(handler: any): IUnit {
  return new EventListenerUnit("change", handler)
}

export function onKeyDown(handler: any): IUnit {
  return new EventListenerUnit("keydown", handler)
}

export function placeholder(_placeholder: string): IUnit {
  return new Attribute("placeholder", _placeholder)
}

export function a(...units: IUnit[]): IView {
  return View.new("a").assignUnits(...units)
}

export function href(value: string) {
  return new Attribute("href", value)
}

export function target(value: "_blank" | "_self" | "_parent"): IUnit {
  return new Attribute("target", value)
}

export function contentEditable(value: boolean): IUnit {
  return new Attribute("contenteditable", value.toString())
}

export function on(event: string, callback: Function): IUnit {
  return new EventListenerUnit(event, callback)
}


export function className(...name: string[]): Attribute {
  return new ClassName(name)
}
