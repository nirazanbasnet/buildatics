import type { ComponentType } from "react";

import AlertShowcase from "./alert";
import AvatarShowcase from "./avatar";
import BadgeShowcase from "./badge";
import ButtonShowcase from "./button";
import CardShowcase from "./card";
import CheckboxShowcase from "./checkbox";
import InputShowcase from "./input";
import LabelShowcase from "./label";
import SelectShowcase from "./select";
import SeparatorShowcase from "./separator";
import SwitchShowcase from "./switch";
import TabsShowcase from "./tabs";
import TextareaShowcase from "./textarea";
import TooltipShowcase from "./tooltip";

export const SHOWCASES: Record<string, ComponentType> = {
  alert: AlertShowcase,
  avatar: AvatarShowcase,
  badge: BadgeShowcase,
  button: ButtonShowcase,
  card: CardShowcase,
  checkbox: CheckboxShowcase,
  input: InputShowcase,
  label: LabelShowcase,
  select: SelectShowcase,
  separator: SeparatorShowcase,
  switch: SwitchShowcase,
  tabs: TabsShowcase,
  textarea: TextareaShowcase,
  tooltip: TooltipShowcase
};
