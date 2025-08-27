### Update: July 25, 2025

Version: 0.3.6

New updates:

- Example app has been updated
- Readme has been re-formatted

# typewriter4react-native

Customizable typewriter-style text animation component for [React Native].

Built for smooth, lightweight, and flexible usage in mobile apps.

Currently the only open-source React Native typewriter that ensures stable container sizing.

Fully compatible with Expo.

## Installation

```
$ npm install --save typewriter4react-native
```

or

```
$ yarn add typewriter4react-native
```

## Usage

Pass text and selected customization data into the component to set-up the animation.

```javascript
import { Typewriter } from "typewriter4react-native";


const SomeComponent {
    return (
        <Typewriter
                isActive
                reserveSpace
                speed="fast"
                textStyle={{
                    fontSize: 30,
                    fontFamily: "Roboto",
                }}
                text="Lorem ipsum dolor sit amet..."
        />
    )
}
```

## Documentation

| Prop                           | Type                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                            | Default                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **text**                       | `string`                                                                                                                                                                                                                                    | The text string that is to be animated.                                                                                                                                                                                                                                                                                                | —                                                                                                                                             |
| **textStyle**                  | `StyleProp<TextStyle>`                                                                                                                                                                                                                      | Text style.                                                                                                                                                                                                                                                                                                                            | `{ fontSize: DEFAULT_FONTSIZE_VALUE, color: 'black', flexWrap: 'wrap' }`                                                                      |
| **cursorStyle**                | `Omit<ViewStyle, 'backgroundColor' \| 'opacity'> & { color?: ViewStyle['backgroundColor']; minOpacity?: ViewStyle['opacity']; maxOpacity?: ViewStyle['opacity']; fontSize?: TextStyle['fontSize']; fontWeight?: TextStyle['fontWeight']; }` | Cursor style.<br/><br/> Size/position are derived from the font size by default (unless explicit values are stated).<br/><br/> Opacity is controlled by `minOpacity` & `maxOpacity`.                                                                                                                                                   | `{ height: fontSize * 0.6, width: fontSize * 0.1, minOpacity: 0, maxOpacity: 1, transform: [{ translateX: fontSize / 3 }, { scale: 1.75 }] }` | Cursor style.<br/><br/> Size/position are derived from the font size by default (unless explicit values are stated).<br/><br/> Opacity is controlled by `minOpacity` & `maxOpacity`. | `{ height: fontSize * 0.6, width: fontSize * 0.1, minOpacity: 0, maxOpacity: 1, transform: [{ translateX: fontSize / 3 }, { scale: 1.75 }] }` |
| **containerStyle**             | `StyleProp<ViewStyle>`                                                                                                                                                                                                                      | Container style.                                                                                                                                                                                                                                                                                                                       | —                                                                                                                                             |
| **speed**                      | `'slow'`&nbsp;&#124;<br/> `'medium'`&nbsp;&#124;<br/> `'fast'`&nbsp;&#124;<br/> `'very_fast'`&nbsp;&#124;<br/> `'fastest'`                                                                                                                  | Typing speed presets.<br/><br/> Ignored if `typingDelayPerChar` (which allows the user to fine-tune the speed with more precision) is set. <br/> <br/> Options (equivalent typingDelayPerChar values shown in parentheses):<br/> `'slow'` (150),<br/> `'medium'` (125),<br/> `'fast'` (100),<br/> `'very_fast'` (75), `'fastest'` (55) | `'fast'`                                                                                                                                      |
| **hideCursorOnFinish**         | `boolean`                                                                                                                                                                                                                                   | Determines if the cursor disappears after the text is displayed.                                                                                                                                                                                                                                                                       | `true`                                                                                                                                        |
| **isActive**                   | `boolean`                                                                                                                                                                                                                                   | Determines if the animation should run.                                                                                                                                                                                                                                                                                                | `true`                                                                                                                                        |
| **startDelay**                 | `number`                                                                                                                                                                                                                                    | Delay in ms before animation starts after activation.                                                                                                                                                                                                                                                                                  | —                                                                                                                                             |
| **cursorDisappearDelay**       | `number`                                                                                                                                                                                                                                    | How many ms the cursor stays after text is displayed.                                                                                                                                                                                                                                                                                  | —                                                                                                                                             |
| **cursorBlinkTime**            | `number`                                                                                                                                                                                                                                    | How many ms a single cursor blink lasts.                                                                                                                                                                                                                                                                                               | `200`                                                                                                                                         |
| **onFinish**                   | `() => void`                                                                                                                                                                                                                                | Callback when typing animation finishes (before cursor disappears).                                                                                                                                                                                                                                                                    | —                                                                                                                                             |
| **reserveSpace**               | `boolean`                                                                                                                                                                                                                                   | Reserves space for the text before it appears.                                                                                                                                                                                                                                                                                         | `true`                                                                                                                                        |
| **backwards**                  | `boolean`                                                                                                                                                                                                                                   | If true, animation erases text instead of typing it.                                                                                                                                                                                                                                                                                   | —                                                                                                                                             |
| **typingDelayPerChar**         | `number`                                                                                                                                                                                                                                    | Delay in ms per character. <br/><br/>Overrides `speed`.                                                                                                                                                                                                                                                                                | Derived from `speed`                                                                                                                          |
| **typingDelayPerCharVariance** | `number`                                                                                                                                                                                                                                    | Random additional delay variance per character.                                                                                                                                                                                                                                                                                        | `100`                                                                                                                                         |
| **cursorType**                 | `'view'`&nbsp; &#124; &nbsp;`'text_simple'`                                                                                                                                                                                                 | Cursor type. `'view'` is customizable; `'text_simple'` is simpler but more limited.                                                                                                                                                                                                                                                    | `'view'`                                                                                                                                      |
| **cursorTextSimpleCustomChar** | `string`                                                                                                                                                                                                                                    | Replaces the &lsquo;&lsquo; &#124; &sbquo;&sbquo; string in `text_simple` cursor. Recommended single character.                                                                                                                                                                                                                        | —                                                                                                                                             |
| **disableCursor**              | `boolean`                                                                                                                                                                                                                                   | If true, the cursor isn't rendered.                                                                                                                                                                                                                                                                                                    | `false`                                                                                                                                       |

## Contributing

Best contact me via GitHub or e-mail if you are willing to contribute. <br/> <br/> Some of the planned (or dreamed) additions are listed in the file `toadd.txt` in the root folder of the package repository.

## License

MIT
