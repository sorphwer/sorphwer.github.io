---
layout: post
title: "Learning Angular NGRX"
subtitle: 'Component State switch and effects'
author: "Riino"
mathjax: true
status: WIP
sticky: false
tags:
  Web
  html
  Front-end
  Angular
---

# Why NGRX Store?

In some cases, we need to manage the states inside a component, or even a global state to let our page render corresponding contents for users. NGRX uses `store` to save a current state, and component can get this live state via observeable variables(from `Rxjs`. **In this way, the store isolate the state from the script of component.** The NGRX doc is [here](https://ngrx.io/guide/store).

Traditionally, we can use a variable as a member inside our component script and make this as a state flag, our code will review this variable and change their state during life cycle. But, to use NGRX can bring such advantages in my opinion:

1. You put state and state-changer, state-handler in an isolated place.
2. You will only have a interface to get/set state.
3. Easier to pass your state, and isolate effect from your pure functions.

To make our code more elegant and replaceable, we can use [facade](https://en.wikipedia.org/wiki/Facade_pattern) pattern based on a `module.facade.ts` , which will provide easy interfaces for components' script to control our **store**. 

# @ngrx/Store

A store is a 'holder' for current state, in our pattern we can use DI to get this store by us DI, and implement store in `app.facade.ts`.

In our cases, our facade class will interact with selector and action, compared with the official image in follow.

![image-20200804211140235](/img/assets/image-20200804211140235.png)

## NGRX: Logic is your code.

### Case study

Suppose we have a component showing a counter's value, it can call facade for **4** operations: 

1. Get counter's value continuously from facade
2. Tell facade to increase counter
3. Tell facade to decrease counter
4. Tell facade to reset counter

![image-20201015172901041](/img/assets/image-20201015172901041.png)

![image-20201015173213724](/img/assets/image-20201015173213724.png)

### Step 1: Action and state format

The first step is to define actions, which is the type of message our facade will dispatch, and the same message that will be caught by **reducer** and **effect**.

```typescript
//module.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
```

Here we export 3 types of action, via given method `createAction` from ngrx, we can add a string as the comment as a attribution in this method.

Also we declare the format of state as `AppState`:

```typescript
//component-state.model.ts
export interface AppState{
  counter?: number;
}
```



### Step 2: Reducer within Store

Notice that the **action** is just the **‘Message Carrier’**, and **reducer** plays the role maintains the states:

```typescript
//module.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
export const featureKey = 'somemodule';
export const initialState : AppState = {
    counter: 0
};//Notice: reducer declare the initial state here
 
const _counterReducer = createReducer(initialState,
  on(increment, state => ({
    ...state,
    counter: state.counter + 1
})),
  on(decrement, state => ({
    ...state,
    counter: state.counter - 1
})),
  on(reset, state => ({
    ...state,
    counter: 0
}))
);//all action handler should be in `createReducer`'s parameters.
 
export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
```

### Step 3: Selector

Now the state was save in to store. here we only have one : `initialState.counter = 0`

```typescript
//module.selector.ts
import { createSelector } from '@ngrx/store';
 
export const getState = createFeatureSelector<AppState>(featureKey);
 
const getCount = createSelector(
  getState,
  (state: AppState) => state.counter
);
export const query = {
    getCount
};
```



## Component with Store

Imagine that the component script is the code behind our visual page, and the store is just like the code behind the code bind, and the facade works as the only interface. As for component, we have its html file, css file, and the component script, while as for the store, we need create these script file : action , reducer, effect, and selector:

Action: define type of action.

Reducer: Capture action dispatched, and replace store’s state. Also, it will init a default state for state.

Selector: Provided a pipe from store, and provided public query method to let other class get sync state.

Effect: Capture action dispatched, and do other things, like call api to send http request, or dispatch other action.

### Set State

First let us review what state we have:

```typescript
//component-state.model.ts
export interface AppState{
  counter?: number;
}
```

To set a state, component script need to call facade’s method, and the latter will dispatch a action:

```typescript
//component.facade.ts
import { Actions } from './module.actions'
public increaseCounter():void {
	this.store.dispatch(Actions.increment());
}

```

And reducer will capture it and change store’s state :

```typescript
 ...
 on(increment, state => ({
    ...state,
    counter: state.counter + 1
})),
...
```

### Get State from facade

Get observable variable from state via selector:

```typescript
//component.facade.ts
public counter$ = this.store.pipe(select(query.getCount));
```

### From component's aspect

```typescript
//module.component.ts
public counter$ = Observable<number>;
public ngOnInit():void {
    this.counter$ = this.facade.counter$;
    this.facade.increaseCounter();
}
```



## Deep in Store : RxJS 

In our procedure, we are actually using  async observable variables to link all the ‘observable chain’. 

# @ngrx/Effect

https://juejin.im/post/58ed71f5a0bb9f006a4aeb9b
