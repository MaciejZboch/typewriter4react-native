# typewriter4react-native

Customizable typewriter-style text animation component for [React Native].

Built for smooth, lightweight, and flexible usage in mobile apps.

Currently the only open-source React Native typewriter that ensures stable container sizing.

Fully compatible with Expo.

## Update: July 31, 2025

Version: 0.5.1

New updates:

- Added 'pause' feature
- Numerous bugfixes
- Example app has been updated
- Readme has been updated

## Examples

![Example App](https://github-production-user-asset-6210df.s3.amazonaws.com/66899019/483981355-1c8e0d29-88d2-449f-8807-d73aa753102a.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250831%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250831T171207Z&X-Amz-Expires=300&X-Amz-Signature=f534b8467c8b85a19ee477e4cc6cb4e84a4ca32d9aec3d1c0857381a26442e81&X-Amz-SignedHeaders=host)
![Example App](https://github-production-user-asset-6210df.s3.amazonaws.com/66899019/483981368-6f6a1310-fc74-421a-a5b4-42a55d317b9e.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250831%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250831T171439Z&X-Amz-Expires=300&X-Amz-Signature=02b56ff25e038d65b1c434c2169d6fa249acb36ee9fd124dd643336198f6eff6&X-Amz-SignedHeaders=host)

## Installation

```bash
npm install --save typewriter4react-native
```

or

```bash
yarn add typewriter4react-native
```

## Usage

Pass text and selected customization data into the component to set up the animation.

```javascript
import { Typewriter } from "typewriter4react-native";

const SomeComponent = () => {
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
    );
};
```

## Documentation

| Prop                           | Type                                                                                                                                                                                                                                        | Description                                                                                                                                                                                                                                               | Default                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **text**                       | `string`                                                                                                                                                                                                                                    | The text string that is to be animated.                                                                                                                                                                                                                     | —                                                                                                                                             |
| **textStyle**                  | `StyleProp<TextStyle>`                                                                                                                                                                                                                      | Text style.                                                                                                                                                                                                                                               | `{ fontSize: DEFAULT_FONTSIZE_VALUE, color: 'black', flexWrap: 'wrap' }`                                                                      |
| **cursorStyle**                | `Omit<ViewStyle, 'backgroundColor' | 'opacity'> & { color?: ViewStyle['backgroundColor']; minOpacity?: ViewStyle['opacity']; maxOpacity?: ViewStyle['opacity']; fontSize?: TextStyle['fontSize']; fontWeight?: TextStyle['fontWeight']; }` | Cursor style. Size/position are derived from the font size by default (unless explicit values are stated). Opacity is controlled by `minOpacity` & `maxOpacity`.                                                                                             | `{ height: fontSize * 0.6, width: fontSize * 0.1, minOpacity: 0, maxOpacity: 1, transform: [{ translateX: fontSize / 3 }, { scale: 1.75 }] }` |
| **containerStyle**             | `StyleProp<ViewStyle>`                                                                                                                                                                                                                      | Container style.                                                                                                                                                                                                                                          | —                                                                                                                                             |
| **speed**                      | `'slow'` &#124; `'medium'` &#124; `'fast'` &#124; `'very_fast'` &#124; `'fastest'`                                                                                                                  | Typing speed presets. Ignored if `typingDelayPerChar` is set. Options (equivalent values in ms per char): `'slow'` (150), `'medium'` (125), `'fast'` (100), `'very_fast'` (75), `'fastest'` (55).                                                          | `'fast'`                                                                                                                                      |
| **hideCursorOnFinish**         | `boolean`                                                                                                                                                                                                                                   | Determines if the cursor disappears after the text is displayed.                                                                                                                                                                                            | `true`                                                                                                                                        |
| **isActive**                   | `boolean`                                                                                                                                                                                                                                   | Determines if the animation should run.                                                                                                                                                                                                                     | `true`                                                                                                                                        |
| **startDelay**                 | `number`                                                                                                                                                                                                                                    | Delay in ms before animation starts after activation.                                                                                                                                                                                                     | —                                                                                                                                             |
| **cursorDisappearDelay**       | `number`                                                                                                                                                                                                                                    | How many ms the cursor stays after text is displayed.                                                                                                                                                                                                     | —                                                                                                                                             |
| **cursorBlinkTime**            | `number`                                                                                                                                                                                                                                    | How many ms a single cursor blink lasts.                                                                                                                                                                                                                  | `200`                                                                                                                                         |
| **onFinish**                   | `() => void`                                                                                                                                                                                                                                | Callback when typing animation finishes (before cursor disappears).                                                                                                                                                                                        | —                                                                                                                                             |
| **reserveSpace**               | `boolean`                                                                                                                                                                                                                                   | Reserves space for the text before it appears.                                                                                                                                                                                                            | `true`                                                                                                                                        |
| **backwards**                  | `boolean`                                                                                                                                                                                                                                   | If true, animation erases text instead of typing it.                                                                                                                                                                                                      | —                                                                                                                                             |
| **typingDelayPerChar**         | `number`                                                                                                                                                                                                                                    | Delay in ms per character. Overrides `speed`.                                                                                                                                                                                                             | Derived from `speed`                                                                                                                          |
| **typingDelayPerCharVariance** | `number`                                                                                                                                                                                                                                    | Random additional delay variance per character.                                                                                                                                                                                                           | `100`                                                                                                                                         |
| **cursorType**                 | `'view'` &#124; `'text_simple'`                                                                                                                                                                                                             | Cursor type. `'view'` is customizable; `'text_simple'` is simpler but more limited.                                                                                                                                                                        | `'view'`                                                                                                                                      |
| **cursorTextSimpleCustomChar** | `string`                                                                                                                                                                                                                                    | Replaces the &#124; string in `text_simple` cursor. Recommended single character.                                                                                                                                                                             | —                                                                                                                                             |
| **disableCursor**              | `boolean`                                                                                                                                                                                                                                   | If true, the cursor isn't rendered.                                                                                                                                                                                                                        | `false`                                                                                                                                       |
| **pause** | `boolean` | If true, pauses writing text. Cursor remains (if not disabled). | —     |

## Contributing

Best contact me via GitHub or e-mail if you are willing to contribute.  \
Some of the planned (or dreamed) additions are listed in the file `toadd.txt` in the root folder of the package repository.

## License

MIT
