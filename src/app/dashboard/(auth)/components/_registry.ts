export type ComponentEntry = {
  slug: string;
  name: string;
  description: string;
};

export const componentRegistry: ComponentEntry[] = [
  { slug: "button", name: "Button", description: "Triggers actions and submits." },
  { slug: "badge", name: "Badge", description: "Small status / counter pill." },
  { slug: "card", name: "Card", description: "Surface for grouped content." },
  { slug: "input", name: "Input", description: "Single-line text field." },
  { slug: "label", name: "Label", description: "Accessible label for a field." },
  { slug: "textarea", name: "Textarea", description: "Multi-line text field." },
  { slug: "select", name: "Select", description: "Dropdown for picking one option." },
  { slug: "checkbox", name: "Checkbox", description: "Binary on/off control." },
  { slug: "switch", name: "Switch", description: "Toggle between two states." },
  { slug: "avatar", name: "Avatar", description: "User image with fallback." },
  { slug: "tabs", name: "Tabs", description: "Switch between sections." },
  { slug: "alert", name: "Alert", description: "Callout for user attention." },
  { slug: "separator", name: "Separator", description: "Visual divider." },
  { slug: "tooltip", name: "Tooltip", description: "Hover hint." }
];
