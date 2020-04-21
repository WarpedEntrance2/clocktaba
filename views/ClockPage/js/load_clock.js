import ml from "../../ml";
import { refresh_big_text_size, set_bottom_line } from "../../BigText";

export default load_clock;

export { dom_beat };
function dom_beat(...args) {
  if (!domBeat) return;
  return domBeat(...args);
}
var domBeat;

function load_clock({ get_option_value }) {
  const time_text_el = document.getElementById("time_text");
  const digit1 = document.getElementById("digit1");
  const digit2 = document.getElementById("digit2");

  /* TIME */
  domBeat;
  var spark;
  (function () {
    //{{{
    var lastMinutes, lastTitle, lastDay, lastTime;
    domBeat = function (
      force //{{{
    ) {
      var d = new Date();

      const is_twelve_hour_format = get_option_value(
        "clock_twelve_hour_format"
      );

      var title =
        ml.date.readable.getHours(d, is_twelve_hour_format) +
        ":" +
        ml.date.readable.getMinutes(d) +
        (get_option_value("clock_tab_display_seconds")
          ? ":" + ml.date.readable.getSeconds(d)
          : "");
      if (lastTitle === undefined || lastTitle !== title || force) {
        lastTitle = title;
        document.title = title;
      }

      var minutes = ml.date.readable.getMinutes(new Date());
      if (!lastMinutes || lastMinutes !== minutes || force) {
        lastMinutes = minutes;
        ml.changeIcon(
          ml.timeIcon(
            undefined,
            get_option_value("clock_tab_icon_color"),
            is_twelve_hour_format
          )
        );
      }

      ml.reqFrame(function () {
        var refreshSize;

        document.body["classList"][d.getHours() < 12 ? "remove" : "add"](
          "isPm"
        );

        var seconds = ml.date.readable.getSeconds(d);

        digit1.innerHTML = seconds[0];
        digit2.innerHTML = seconds[1];
        //screenshot
        //digit1.innerHTML=0;
        //digit2.innerHTML=0;

        var newTime =
          ml.date.readable.getHours(d, is_twelve_hour_format) +
          ":" +
          ml.date.readable.getMinutes(d);
        //var newTime = "&nbsp; 01:37 PM &nbsp;";
        if (lastTime === undefined || lastTime !== newTime || force) {
          lastTime = newTime;
          time_text_el.innerHTML = newTime;
          //screenshot
          //time_text_el.innerHTML = '01:37';
          refreshSize = true;
        }

        var day = d.getDay();
        if (!lastDay || lastDay !== day || force) {
          lastDay = day;
          const date_text = get_option_value("clock_display_date")
            ? ml.date.readable.getDay(d) +
              " - " +
              ml.date.readable.getMonth(d) +
              " " +
              ml.date.readable.getDate(d) +
              (get_option_value("clock_display_week")
                ? " - Week " + ml.date.getWeek(d)
                : "")
            : "";
          set_bottom_line(date_text);
          refreshSize = true;
        }
        if (refreshSize) refresh_big_text_size();
      });

      //metroTile&&metroTile(lastTime,lastDay);
    };
    //}}}

    spark = function () {
      (function repeater() {
        domBeat();
        window.setTimeout(repeater, 1000);
      })();
    };
    //}}}
  })();

  spark();
}
