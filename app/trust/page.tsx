import { Card } from '@/components/ui/card'
import { PageHeader } from '@/components/omni/primitives'
import { StaggerContainer, StaggerItem } from '@/components/omni/page-transition'
import { trustCenterInfo } from '@/lib/data-m4'
import { ShieldCheck, Building2, Smartphone, Lock, Eye, CheckCircle2, AlertTriangle, Key } from 'lucide-react'

export const metadata = {
  title: 'Trust Center — OmniScope',
}

export default function TrustCenterPage() {
  const data = trustCenterInfo

  return (
    <StaggerContainer>
      <StaggerItem>
        <PageHeader
          eyebrow="Trust Center"
          title="Security, Privacy, and Connections"
          question="You control your data. See exactly what OmniScope knows, who we connect to, and how your wealth is protected."
        />
      </StaggerItem>

      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        
        {/* Connected Brokers & Accounts */}
        <StaggerItem>
          <Card className="p-6 h-full">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
              <Building2 className="size-5 text-primary" />
              Connected Institutions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Banks</h3>
                <ul className="space-y-3">
                  {data.accounts.map((acc, i) => (
                    <li key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                      <div>
                        <div className="text-sm font-medium text-foreground">{acc.bank}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Synced {acc.lastSync}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-success">
                        <CheckCircle2 className="size-3.5" />
                        {acc.status}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">Brokers</h3>
                <ul className="space-y-3">
                  {data.brokers.map((broker, i) => (
                    <li key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                      <div>
                        <div className="text-sm font-medium text-foreground">{broker.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">Synced {broker.lastSync}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-success">
                        <CheckCircle2 className="size-3.5" />
                        {broker.status}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button className="w-full mt-6 text-sm font-medium border border-border rounded-lg py-2.5 hover:bg-accent transition-colors">
              + Connect new institution
            </button>
          </Card>
        </StaggerItem>

        <div className="flex flex-col gap-6">
          {/* Security */}
          <StaggerItem>
            <Card className="p-6">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <ShieldCheck className="size-5 text-primary" />
                Security
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="size-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground">App Authenticator</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-success">Enabled</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="size-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Trusted Devices</div>
                      <div className="text-xs text-muted-foreground">Currently active</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">{data.security.trustedDevices} Devices</div>
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* Privacy & AI Memory */}
          <StaggerItem>
            <Card className="p-6">
              <h2 className="text-base font-semibold text-foreground flex items-center gap-2 mb-6">
                <Eye className="size-5 text-primary" />
                Privacy & AI Memory
              </h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground">Data Sharing</div>
                  <div className="text-xs text-muted-foreground mt-1">{data.privacy.dataSharing}. We never sell your data to third parties.</div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Key className="size-4" />
                    AI Memory & Context
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    OmniScope AI learns your investment style to personalize insights. You can view or clear this memory at any time.
                  </div>
                  <button className="mt-3 text-xs font-medium text-danger hover:underline">
                    Clear AI Memory
                  </button>
                </div>
              </div>
            </Card>
          </StaggerItem>
        </div>
      </div>

    </StaggerContainer>
  )
}
