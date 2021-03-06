import compose from '../compose';

export default function composeWithTracker(reactiveFn, L, E, options) {
  const onPropsChange = (props, onData, context) => {
    let trackerCleanup;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        trackerCleanup = reactiveFn(props, onData, context);
      });
    });

    return () => {
      if (typeof (trackerCleanup) === 'function') {
        trackerCleanup();
      }
      return handler.stop();
    };
  };

  return compose(onPropsChange, L, E, options);
}
