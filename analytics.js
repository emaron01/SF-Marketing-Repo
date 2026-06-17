// Deferred analytics — GA4, Clarity, PostHog (loads after first paint)
(function () {
  var loaded = false;

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());

    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-N9DTR6483V';
    gaScript.onload = function () {
      gtag('config', 'G-N9DTR6483V');
    };
    document.head.appendChild(gaScript);

    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'x4xbuxl4o9');

    !function (t, e) {
      var o, n, p, r;
      e.__SV ||
        ((window.posthog = e),
        (e._i = []),
        (e.init = function (i, s, a) {
          function g(t, e) {
            var o = e.split('.');
            2 == o.length && ((t = t[o[0]]), (e = o[1]));
            t[e] = function () {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
            };
          }
          ((p = t.createElement('script')).type = 'text/javascript'),
            (p.async = !0),
            (p.src = s.api_host + '/static/array.js'),
            (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
          var u = e;
          for (void 0 !== a ? (u = e[a] = []) : (a = 'posthog'), u.people = u.people || [], u.toString = function (t) {
            var e = 'posthog';
            return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
          }, u.people.toString = function () {
            return u.toString(1) + ' (stub)';
          }, o = 'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonPropertiesForFlags'.split(' '), n = 0; n < o.length; n++)
            g(u, o[n]);
          e._i.push([i, s, a]);
        }),
        (e.__SV = 1));
    })(document, window.posthog || []);

    window.posthog.init('phc_AjTo6YUhyqPEYuLrsApdqqZXPEogtWzNRAW8qmedLuN5', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
    });
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadAnalytics, { timeout: 2500 });
  } else {
    window.addEventListener('load', loadAnalytics, { once: true });
  }
})();
