import { SectionList, Text, View } from 'react-native';
import ExampleBox from '../components/ExampleBox';
import { useState } from 'react';
import DividerLine from '../components/DividerLine';
import { ColorValues } from '../constants/colors';
import type { ExampleType } from '../types';
import { examples } from '../data/examples';
import { Typewriter } from 'typewriter4react-native';

export default function App() {
  const [activatedExampleIds, setActivatedExampleIds] = useState<
    ExampleType['id'][]
  >([]);
  const [subheaderIsActive, setSubheaderIsActive] = useState<boolean>(false);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: ColorValues.offWhite,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
      }}
    >
      {/* header */}
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typewriter
          isActive
          textStyle={{
            fontFamily: 'Roboto',
            fontSize: 24,
            fontWeight: 700,
            color: ColorValues.offBlack,
            textAlign: 'center',
          }}
          text="typewriter4react-native"
          cursorDisappearDelay={500}
          onFinish={() => {
            setSubheaderIsActive(true);
          }}
        />

        <Typewriter
          isActive={subheaderIsActive}
          disableCursor
          speed="slow"
          textStyle={{
            fontFamily: 'Roboto',
            fontSize: 20,
            fontWeight: 500,
            color: ColorValues.offBlack,
            paddingTop: 8,
            textAlign: 'center',
          }}
          text="example app"
        />
      </View>
      {/* main */}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 4,
          marginTop: 12,
          paddingVertical: 24,
          gap: 36,
        }}
      >
        <SectionList
          sections={examples}
          style={{ paddingHorizontal: 28 }}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={{ borderRadius: 24, paddingBottom: 12, paddingTop: 24 }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: 16,
                  fontFamily: 'Roboto',
                  color: ColorValues.offBlack,
                }}
              >
                {title}
              </Text>
            </View>
          )}
          renderItem={({ item }: { item: ExampleType }) => (
            <ExampleBox
              key={item.id}
              title={item.title}
              description={item.description}
              isActive={activatedExampleIds.includes(item.id)}
              typewriterProps={item.typewriterProps}
              onButtonPress={() =>
                setActivatedExampleIds((prev) => [...prev, item.id])
              }
            />
          )}
          ListFooterComponent={
            <DividerLine
              viewStyle={{
                paddingBottom: 124,
                paddingTop: 100,
              }}
              width="50%"
              weight={0.25}
            />
          }
        />
      </View>
    </View>
  );
}
