import {StyleSheet} from 'react-native';
import {align, font, weight, palette, sizes, position} from '.';
import {isIOS} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flexDirection: align.flexColumnReverse,
    justifyContent: align.flexBetween,
    padding: sizes.large,
  },
  itemContainer: {
    flex: 1,
    flexDirection: align.flexRow,
    justifyContent: align.flexBetween,
  },
  homeContainer: {
    flex: 1,
    flexGrow: 1,
  },
  loadingContainer: {
    backgroundColor: palette.white,
    height: sizes.hundred * 4,
    flexDirection: align.flexRow,
    justifyContent: align.center,
    alignItems: align.flexStart,
    top: sizes.hundred * 4,
    position: position.absolute,
    width: sizes.hundred * 4,
    zIndex: sizes.hundred,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: align.flexRow,
    justifyContent: align.flexBetween,
    padding: sizes.medium,
  },
  headerContainer: {
    backgroundColor: palette.black,
    flexDirection: align.flexRow,
    paddingVertical: isIOS ? sizes.null : sizes.medium,
  },
  flatListContainer: {
    flex: 0,
    marginBottom: sizes.xxl,
  },
  characterNameContainer: {
    flex: 1,
    justifyContent: align.center,
    alignItems: align.center,
  },
  sectionContainer: {
    padding: sizes.medium,
    marginTop: sizes.extraMedium,
  },
  vehiclesContainer: {
    padding: sizes.medium,
  },
  loadingContainer2: {
    alignItems: align.center,
    justifyContent: align.center,
    flexDirection: align.flexRow,
  },
  iconContainer: {
    marginLeft: isIOS ? sizes.null : sizes.medium,
  },
  loadingWrapper: {
    flexDirection: align.flexRow,
    justifyContent: align.center,
    alignItems: align.center,
    marginTop: sizes.small,
  },
  characterList: {
    flexGrow: 1,
    paddingBottom: sizes.hundred,
  },
  name: {
    fontWeight: weight.bold,
    fontSize: font.large,
    color: palette.black,
  },
  subtitle: {
    fontSize: font.medium, 
    color: palette.gray,
  },
  separator: {
    backgroundColor: palette.separatorColor,
    height: 1,
    width: sizes.auto,
    marginLeft: sizes.large,
  },
  spinner: {
    flex: 1,
    justifyContent: align.center,
    alignItems: align.flexStart,
    flexDirection: align.flexRow,
    marginTop: sizes.small,
  },
  spinner2: {
    flex: 1,
    justifyContent: align.center,
    alignItems: align.center,
  },
  errorMessage: {
    fontSize: font.large,
    fontWeight: weight.bold,
    color: palette.red,
    marginTop: sizes.small,
  },
  loading: {
    marginLeft: sizes.extraSmall,
    fontSize: font.large,
  },
  loadingText: {
    marginTop: sizes.small,
    marginLeft: sizes.small,
    marginBottom: sizes.small - 2,
    fontSize: font.large,
    textAlign: align.center,
    textAlignVertical: align.center,
    color: palette.gray,
    fontWeight: weight.bold
  },
  characterName: {
    color: palette.white,
    fontSize: font.large,
    fontWeight: weight.bold,
    marginRight: sizes.xxl,
  },
  informationKey: {
    color: palette.gray,
    fontWeight: weight.bold,
    fontSize: font.large,
  },
  sectionLabel: {
    fontWeight: weight.bold,
    fontSize: font.large,
    color: palette.black,
  },
  noVehiclesMessage: {
    textAlign: align.left,
    paddingVertical: sizes.extraMedium,
    fontSize: font.large,
    fontWeight: weight.bold,
    color: palette.gray,
  },
  icon: {
    padding: sizes.small,
  },
  column: {
    flex: 1, 
    flexDirection: align.flexColumn
  },
  row: {
    flexDirection: align.flexRow
  }
});
