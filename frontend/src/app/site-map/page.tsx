import Link from "next/link";

const siteMap = () => {
  return (
    <>
      <h1>Site Map</h1>
      <ul id="site-map">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/events">Events - lists all events</Link>
        </li>
        <li>
          <ul>
            <li>
              <Link href="/events/1">Event details</Link>
            </li>
            <li>
              <ul>
                <li>
                  <Link href="/events/1/edit">Edit or delete event</Link>
                </li>
                <li>
                  <Link href="/events/1/clone">Clone event</Link>
                </li>
                <li>
                  <Link href="/events/1/signup">Signup for this event</Link>
                  <ul>
                    <li>
                      <Link href="/events/1/signup/edit">Edit your signup</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/events/1/signup-confirmation">
                    Signup Confirmation - only for if you've signed up under an
                    account
                  </Link>
                </li>
                <li>
                  <Link href="/events/1/signups">
                    Signups - for leaders with permission to view who signed up
                  </Link>
                </li>
                <li>
                  <Link href="/events/1/check-ins">
                    Check-ins - for leaders with permission to view who's been
                    checked in
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/organizations">
            Organizations - lists all organizations, only for org leaders
          </Link>
          <ul>
            <li>
              <Link href="/organizations/1">
                Organization details - for leaders, also lists their teams
              </Link>
            </li>
            <li>
              <ul>
                <li>
                  <Link href="/organizations/1/edit">
                    Edit or delete organization
                  </Link>
                </li>
                <li>
                  <Link href="/organizations/1/teams">
                    Teams - for leaders, also lists their team members
                  </Link>
                </li>
                <li>
                  <ul>
                    <li>
                      <Link href="/organizations/1/teams/1">
                        Team details - for leaders, also lists their team
                        members
                      </Link>
                    </li>
                    <li>
                      <ul>
                        <li>
                          <Link href="/organizations/1/teams/1/edit">
                            Edit or delete a team
                          </Link>
                        </li>
                        <li>
                          <Link href="/organizations/1/teams/1/create">
                            Add a team
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          Users
          <ul>
            <li>
              <Link href="/user/login">Login</Link>
            </li>
            <li>
              <Link href="/user/create-account">Create an account</Link>
            </li>
            <li>
              <Link href="/user/new-password">New Password</Link>
            </li>
            <li>
              <Link href="/user/reset-password">Reset Password</Link>
            </li>
            <li>
              <Link href="/user/account">Account</Link>
              <ul>
                <li>
                  <Link href="/user/account/edit">Edit Account</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/user/logout">Logout</Link>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default siteMap;
