---
layout: post
title: "Learning Angular Part 2"
subtitle: 'Template Syntax'
author: "Riino"
mathjax: false
sticky: false
tags:
  Web
  html
  Front-end
  Angular
---

# Microsyntax

If :

```
<div *ngIf="hero" class="name">{{hero.name}}</div>
```

for (loop):

```
<ul>
  <li *ngFor="let hero of heroes">{{hero.name}}</li>
</ul>
```

switch:

```
<div [ngSwitch]="hero?.emotion">
  <app-happy-hero    *ngSwitchCase="'happy'"    [hero]="hero"></app-happy-hero>
  <app-sad-hero      *ngSwitchCase="'sad'"      [hero]="hero"></app-sad-hero>
  <app-confused-hero *ngSwitchCase="'confused'" [hero]="hero"></app-confused-hero>
  <app-unknown-hero  *ngSwitchDefault           [hero]="hero"></app-unknown-hero>
</div>
```

# Interpolation

## Render data

Interpolation is the most common syntax in our html. As we mentioned, for each component, we have a **css file**, a **html file** and a **ts** script file as **the script behind**, if we declare a variable in script behind, we can use interpolation to render it directly in html:

```html
{% raw %}
<h3>Current customer: {{ currentCustomer }}</h3>
{% endraw%}
```

Notice that html tag is not allowed to appear in script behind, unlike jsx in react.

However, only the “name” of variable will be rendered, so if we have {% raw %} `{{1+2}}` {% endraw%}, this will be calculated and rendered as `2` , same as other functions/API when using interpolation.

Besides, you can use **operators ** to tell more information :
{% raw %}
`{{var!}}` tell angular that var must exist.

`{{var?}}` tell angular that var can be undefined.

`{{var | func}}` tell angular that render the output from pipe `func`, with the input of var.
{% endraw%}

## Pipes

Pipes like filters in liquid or jinja, but more powerful, and easier to understand.

The basic concept is that :

1. if we have a serious methods in our script called `fun1`, `fun2`, `func3`, each will accept a data input , and return its output data.

2. We want our variable, `var`, to be processed via these functions, like we want to get fun3(func2(func1(var)))

3. To do this directly in interpolation, we use pipe and the final syntax is :

   ```
   {{var | func1 | func2 | func3 }}
   ```

4. However, we need to declare functions like  `func1` is our custom pipes, we can put pipes in a separate file:

   For example, our `func` accept input and plus its parameter (default is 1)

   ```typescript
   //your-component.pipe.ts
   import { Pipe, PipeTransform } from '@angular/core';
   @Pipe({name: 'func1'})
   export class CustomPipe implements PipeTransform {
     transform(value: number,plus?:number): number {
       return plus? number+plus : number+1;
     }
   }
   ```

    

Here’s how to use pipes with attribution:

```
{{var | func1:10}}
```

## Props

